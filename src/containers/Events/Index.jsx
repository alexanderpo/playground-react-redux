import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getEvents } from '../../actions/events';
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

const propTypes = {
  events: PropTypes.array,
  eventsCoords: PropTypes.array,
  actions: PropTypes.shape({
    getEvents: PropTypes.func,
  }),
};

class EventsWrapper extends Component {
  componentWillMount() {
    this.props.actions.getEvents();
  }

  render() {
    const { eventsCoords } = this.props;
    return (
      <div style={styles.wrap} className="events-container">
        <div style={styles.events} className="events">
          <div>
            <Event />
          </div>
        </div>
        <div style={styles.mapContainer} className="map-container">
          <Map events={eventsCoords} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  events: state.events.details ? state.events.details : [],
  eventsCoords: !state.events.details ? [] : state.events.details.map(event => ({
    lat: event.playground_latitude,
    lng: event.playground_longitude,
    title: event.event_title,
    description: event.playground_description,
    creator: event.creator_name,
    dateTime: event.event_datetime,
  })),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getEvents,
  }, dispatch),
});

EventsWrapper.propTypes = propTypes;
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EventsWrapper));
