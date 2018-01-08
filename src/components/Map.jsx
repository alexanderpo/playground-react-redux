/* global google */
/* global isMapLoad */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import playgroundIcon from '../styles/images/playground.png';
import userMarkerIcon from '../styles/images/user-marker-icon.png';

const propTypes = {
  clickable: PropTypes.bool,
  placemarks: PropTypes.array,
  getAddress: PropTypes.func,
  updatePosition: PropTypes.func,
  modalCallback: PropTypes.func,
};

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultUserPosition: {
        lat: -25.363,
        lng: 131.044,
      },
      markers: [],
    };
  }

  componentDidMount = () => {
    if (isMapLoad) {
      this.initializeMap(this.state.defaultUserPosition);
    }
    if (isMapLoad && this.props.clickable) {
      this.handleMapClick();
    }
  };

  componentWillUpdate = () => {
    if (!this.map) {
      this.initializeMap(this.state.defaultUserPosition);
    }
  };

  componentDidUpdate = (prevProps) => {
    if (this.map) {
      const isEqual = _.isEqual(prevProps.placemarks, this.props.placemarks);
      if (!isEqual) {
        this.state.markers.map(marker => marker.setMap(null));
        this.initializeEventPoints(this.props.placemarks);
      } else if (_.isEmpty(this.state.markers)) {
        this.state.markers.map(marker => marker.setMap(null));
        this.initializeEventPoints(this.props.placemarks);
      }
    }
  };

  componentWillUnmount = () => {
    this.state.markers.map(marker => marker.setMap(null));
  };

  infoWindow = (eventInfo) => {
    const allEventsInfo = eventInfo.map(info => (
      `<tr>
        <td>${info.title}</td>
        <td>${info.datetime}</td>
      </tr>`
    ));
    return (
      `<table class="map-info-window-table">
        <tbody>
          <tr class="map-info-window-table-header">
            <td>Title</td>
            <td>Datetime</td>
          </tr>
          ${allEventsInfo}
        </tbody>
      </table>`
    );
  };

  initializeMap = (defaultPosition) => {
    this.map = isMapLoad ? new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: {
        ...defaultPosition,
        mapTypeId: 'roadmap',
      },
      mapTypeControl: false,
      streetViewControl: false,
      rotateControl: false,
    }) : false;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const currentPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.initializeUserLocation(currentPosition);
        this.map.setCenter(currentPosition);
      });
    } else {
      console.log('Browser doesn\'t support geolocation'); // eslint-disable-line
    }
  };

  handleMapClick = () => {
    google.maps.event.addListener(this.map, 'click', (event) => {
      this.state.markers.map(marker => marker.setMap(null));
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      const position = [{
        latitude: lat,
        longitude: lng,
        info: {
          title: 'Your point',
        },
      }];
      this.props.updatePosition(position[0]);
      this.props.getAddress(lat, lng).then(() => this.initializeEventPoints(position));
      this.props.modalCallback({ clicked: true });
    });
  };

  initializeEventPoints = (placemarks) => {
    const uniqPlacemarks = _.uniqBy(placemarks, 'latitude', 'longitude');
    const otherPlacemarks = _.difference(placemarks, uniqPlacemarks);
    const otherPlacemarksIds = otherPlacemarks.map(pl => pl.info.playgroundId);

    uniqPlacemarks.map((placemark) => { // eslint-disable-line
      const marker = new google.maps.Marker({
        position: {
          lat: placemark.latitude,
          lng: placemark.longitude,
        },
        icon: playgroundIcon,
        title: placemark.info.title,
        map: this.map,
      });
      if (!this.props.clickable) {
        const isIncludeEvent = _.includes(otherPlacemarksIds, placemark.info.playgroundId);
        const allEventsInfo = [];

        otherPlacemarks.map((other) => { // eslint-disable-line
          if (other.info.playgroundId === placemark.info.playgroundId) {
            allEventsInfo.push(other.info, placemark.info);
          }
        });
        const infoWindow = new google.maps.InfoWindow({
          content: !isIncludeEvent ?
            this.infoWindow([placemark.info]) : this.infoWindow(allEventsInfo),
        });
        marker.addListener('click', () => {
          infoWindow.open(this.map, marker);
        });
      }
      this.state.markers.push(marker);
    });
  };

  initializeUserLocation = (position) => {
    const point = new google.maps.Marker({
      position: {
        lat: position.lat,
        lng: position.lng,
      },
      icon: userMarkerIcon,
    });
    point.setMap(this.map);
  };

  render() {
    return (
      <div id="map" />
    );
  }
}

Map.propTypes = propTypes;
export default Map;
