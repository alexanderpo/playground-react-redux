/* global google */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import playgroundIcon from '../styles/images/playground.png';
import userMarkerIcon from '../styles/images/user-marker-icon.png';

const propTypes = {
  events: PropTypes.array,
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
  }

  componentDidMount() {
    this.initializeMap(this.state.defaultUserPosition);
  }

  componentWillReceiveProps(nextProps) {
    this.initializeEventPoints(nextProps.events);
  }

  componentDidUpdate() {
    if (!this.map) {
      this.initializeMap(this.state.defaultUserPosition);
    }
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

  initializeEventPoints(events) {
    const markers = events.map(event => new google.maps.Marker({
      position: {
        lat: event.playground_latitude,
        lng: event.playground_longitude,
      },
      icon: playgroundIcon,
      title: event.event_title,
      map: this.map,
    }));
  }

  initializeUserLocation(position) {
    console.log('INIT USER LOCATION');
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

/*
initializeEventPoints(events) {
  console.log('INIT POINTS ???');
  if (!_.isEmpty(events)) {
    console.log('INIT POINTS !!!');
    events.map((event) => {
      const marker = new google.maps.Marker({
        position: {
          lat: event.playground_latitude,
          lng: event.playground_longitude,
        },
        icon: playgroundIcon,
        title: event.event_title,
      });
      const infoWindow = new google.maps.InfoWindow({
        content: this.infoWindow(
          event.event_title,
          event.playground_description,
          event.creator_name,
          event.event_datetime,
        ),
      });
      marker.addListener('click', () => {
        infoWindow.open(this.map, marker);
      });
      marker.setMap(this.map);
    });
  } else {
    // TODO: meassage for user
    console.log('dont have points'); // eslint-disable-line
  }
}
*/
