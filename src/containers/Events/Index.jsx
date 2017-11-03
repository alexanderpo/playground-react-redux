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

const eventsData = [
  { // TODO: build event data from playground with event
    lat: 52.6704471,
    lng: 24.8366419,
    title: 'Первый ивент',
    description: 'blablablablbalbalba',
    creator: 'alexpo',
    dateTime: '25.02.2017 8:35',
  },
  {
    lat: 51.6704471,
    lng: 22.8366419,
    title: 'Второй ивент',
    description: 'blablablablbalbalba',
    creator: 'Darya',
    dateTime: '25.02.2017 8:35',
  },
  {
    lat: 51.4471,
    lng: 22.86419,
    title: 'Третий ивент',
    description: 'blablablablbalbalba',
    creator: 'Helen',
    dateTime: '25.02.2017 8:35',
  },
];

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
          <Map events={eventsData} />
        </div>
      </div>
    );
  }
}

export default EventsWrapper;
