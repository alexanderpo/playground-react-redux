import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import { getEvents } from '../../actions/events';
import { subscribeEventControl, favoritePlaygroundControl } from '../../actions/user';
import EventsFilter from '../../components/Events/Filter';
import Map from '../../components/Map';
import EventPreview from '../../components/Events/Preview';

const propTypes = {
  events: PropTypes.array,
  placemarks: PropTypes.array,
  userId: PropTypes.number,
  actions: PropTypes.shape({
    getEvents: PropTypes.func,
    subscribeEventControl: PropTypes.func,
    favoritePlaygroundControl: PropTypes.func,
    updateSubscribedEvents: PropTypes.func,
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
        userId={this.props.userId}
        isSubscribed={event.isSubscribed}
        isFavorite={event.isFavorite}
        subscribeEventControl={this.props.actions.subscribeEventControl}
        favoritePlaygroundControl={this.props.actions.favoritePlaygroundControl}
        event={{
          id: event.event_id,
          title: event.event_title,
          datetime: moment(event.event_datetime).format('lll'),
        }}
        playground={{
          id: event.playground_id,
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
    const { events, placemarks } = this.props;
    return (
      <div className="content-container">
        <div className="left-content-box">
          <EventsFilter>
            { this.renderEvents(events) }
          </EventsFilter>
        </div>
        <div className="map-container">
          <Map placemarks={placemarks} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const userId = state.user.details.id;
  const { subscribedEvents } = state.user.details;
  const { favoritePlaygrounds } = state.user.details;

  const events = state.events.details.map(event => ({
    ...event,
    isSubscribed: _.includes(subscribedEvents, event.event_id),
    isFavorite: _.includes(favoritePlaygrounds, event.playground_id),
  }));

  const placemarks = state.events.details.map(event => ({
    latitude: event.playground_latitude,
    longitude: event.playground_longitude,
    title: event.event_title,
    description: event.playground_description,
    datetime: moment(event.event_datetime).format('lll'),
    creator: event.creator_name,
  }));

  return {
    events,
    placemarks,
    userId,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getEvents,
    subscribeEventControl,
    favoritePlaygroundControl,
  }, dispatch),
});

EventsWrapper.propTypes = propTypes;
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EventsWrapper));
