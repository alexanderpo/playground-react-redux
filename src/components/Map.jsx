/* global google */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import playgroundIcon from '../styles/images/playground.png';
import userMarkerIcon from '../styles/images/user-marker-icon.png';

const propTypes = {
  placemarks: PropTypes.arrayOf(PropTypes.shape({
    lat: PropTypes.float,
    lng: PropTypes.float,
    title: PropTypes.string,
    description: PropTypes.string,
    datetime: PropTypes.string,
    creator: PropTypes.string,
  })),
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

  componentDidMount() {
    this.initializeMap(this.state.defaultUserPosition);
  }

  componentWillReceiveProps(nextProps) {
    this.state.markers.map(marker => marker.setMap(null));
    this.initializeEventPoints(nextProps.placemarks);
  }

  componentDidUpdate() {
    if (!this.map) {
      this.initializeMap(this.state.defaultUserPosition);
    }
  }

  componentWillUnmount() {
    this.state.markers.map(marker => marker.setMap(null));
  }

  infoWindow = (title, description, creator, dateTime) => (
    `<div className="map-info-window">
      <h3>${title}</h3>
      <p>${description}</p>
      <h5>${creator}</h5>
      <h5>${dateTime}</h5>
    </div>`
  );

  initializeMap(defaultPosition) {
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: {
        ...defaultPosition,
        mapTypeId: 'roadmap',
      },
      mapTypeControl: false,
      streetViewControl: false,
      rotateControl: false,
    });
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
  }

  initializeEventPoints(placemarks) {
    placemarks.map((placemark) => { // eslint-disable-line
      const marker = new google.maps.Marker({
        position: {
          lat: placemark.latitude,
          lng: placemark.longitude,
        },
        icon: playgroundIcon,
        title: placemark.title,
        map: this.map,
      });
      const infoWindow = new google.maps.InfoWindow({
        content: this.infoWindow(
          placemark.title,
          placemark.description,
          placemark.creator,
          placemark.datetime,
        ),
      });
      marker.addListener('click', () => {
        infoWindow.open(this.map, marker);
      });
      this.state.markers.push(marker);
    });
  }

  initializeUserLocation(position) {
    const point = new google.maps.Marker({ // eslint-disable-line
      position: {
        lat: position.lat,
        lng: position.lng,
      },
      icon: userMarkerIcon,
      map: this.map,
    });
  }

  render() {
    return (
      <div id="map" />
    );
  }
}

Map.propTypes = propTypes;
export default Map;
