/* global google */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import playgroundIcon from '../styles/images/playground.png';

const propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    creator: PropTypes.string,
    dateTime: PropTypes.string,
  })),
};

const styles = {
  map: {
    height: '400px',
    width: '100%',
  },
};

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultUserPosition: {
        lat: -25.363,
        lng: 131.044,
      },
    };
    google.maps.event.addDomListenerOnce(window, 'load', () => {
      this.initializeMap(this.state.defaultUserPosition);
      this.initializeEventPoints(props.events);
    });
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
      zoom: 7,
      center: {
        ...defaultPosition,
        mapTypeId: 'roadmap',
      },
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
      // TODO: show message for user
      console.log('Browser doesn\'t support geolocation'); // eslint-disable-line
    }
  }

  initializeUserLocation(position) {
    const point = new google.maps.Marker({ // eslint-disable-line
      position: {
        lat: position.lat,
        lng: position.lng,
      },
      map: this.map,
    });
  }

  initializeEventPoints(events) {
    if (!_.isEmpty(events)) {
      events.map((event) => { // eslint-disable-line
        const marker = new google.maps.Marker({
          position: {
            lat: event.lat,
            lng: event.lng,
          },
          icon: playgroundIcon,
          title: event.title,
          map: this.map,
        });
        const infoWindow = new google.maps.InfoWindow({
          content: this.infoWindow(event.title, event.description, event.creator, event.dateTime),
        });
        marker.addListener('click', () => {
          infoWindow.open(this.map, marker);
        });
      });
    } else {
      // TODO: meassage for user
      console.log('dont have points'); // eslint-disable-line
    }
  }

  render() {
    return (
      <div className="map-container">
        <h3>Google map</h3>
        <div style={styles.map} id="map" />
      </div>
    );
  }
}

Map.propTypes = propTypes;
export default Map;
