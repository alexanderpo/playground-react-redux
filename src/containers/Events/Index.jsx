import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { getEvents } from '../../actions/events';
import EventsFilter from '../../components/Events/Filter';
import Map from '../../components/Map';
import EventPreview from '../../components/Events/EventPreview';

const propTypes = {
  events: PropTypes.array,
  actions: PropTypes.shape({
    getEvents: PropTypes.func,
  }),
};

class EventsWrapper extends Component {
  componentDidMount() {
    this.props.actions.getEvents();
  }

  renderEvents = events => (
    events.map(event => (
      <EventPreview
        key={event.event_id}
        event={{
          id: event.event_id,
          title: event.event_title,
          datetime: moment(event.event_datetime).format('lll'),
        }}
        playground={{
          name: event.playground_name,
          description: event.playground_description,
          images: event.playground_images,
          address: event.playground_address,
          creator: event.playground_creator,
          lat: event.playground_latitude,
          lng: event.playground_longitude,
        }}
        creator={{
          name: event.creator_name,
          image: event.creator_image,
          email: event.creator_email,
          phone: event.creator_phone,
        }}
      />
    ))
  );

  render() {
    const { events } = this.props;
    return (
      <div className="content-container">
        <div className="left-content-box">
          <EventsFilter>
            { this.renderEvents(events) }
          </EventsFilter>
        </div>
        <div className="map-container">
          <Map events={events} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  events: state.events.details ? state.events.details : [],
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getEvents,
  }, dispatch),
});

EventsWrapper.propTypes = propTypes;
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EventsWrapper));
