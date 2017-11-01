import React, { Component } from 'react';
import Map from '../../components/Map';
import Event from '../../components/Events/Event';

const styles = {
  wrap: {
    width: '100%',
    overflow: 'auto',
  },
  events: {
    width: '60%',
    float: 'left',
    height: '100vh',
  },
  mapContainer: {
    width: '40%',
    float: 'right',
    height: '100vh',
  },
};

class EventsWrapper extends Component {
  render() {
    return (
      <div style={styles.wrap} className="events-container">
        <div style={styles.events} className="events">
          <div>
            <Event />
          </div>
        </div>
        <div style={styles.mapContainer} className="map-container">
          <Map />
        </div>
      </div>
    );
  }
}

export default EventsWrapper;
