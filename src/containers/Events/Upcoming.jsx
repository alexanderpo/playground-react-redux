import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import { CircularProgress } from 'material-ui';
import { getUpcomingEvents, subscribeEventControl, favoritePlaygroundControl } from '../../actions/user';
import EmptyEvents from '../../components/Events/Empty';
import EventsFilter from '../../components/Events/Filter';
import Map from '../../components/Map';
import EventPreview from '../../components/Events/Preview';

const propTypes = {
  events: PropTypes.array,
  placemarks: PropTypes.array,
  userId: PropTypes.number,
  isLoading: PropTypes.bool,
  actions: PropTypes.shape({
    getUpcomingEvents: PropTypes.func,
    subscribeEventControl: PropTypes.func,
    favoritePlaygroundControl: PropTypes.func,
  }),
};

class UpcomingEvents extends Component {
  componentDidMount() {
    const { userId, actions } = this.props;
    actions.getUpcomingEvents(userId);
  }

  renderEvents = events => (
    _.isEmpty(events) ? <EmptyEvents /> :
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
            images: event.images,
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
    const { events, placemarks, isLoading } = this.props;
    return (
      <div className="content-container">
        <div className="left-content-box">
          <EventsFilter>
            {
              isLoading ? <CircularProgress className="loading-spinner" /> : this.renderEvents(events)
            }
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
  const { isLoading } = state.events.upcoming;
  const { subscribedEvents } = state.user.details;
  const { favoritePlaygrounds } = state.user.details;

  const events = state.events.upcoming.details.error ? [] :
    state.events.upcoming.details.map(event => ({
      ...event,
      isSubscribed: _.includes(subscribedEvents, event.event_id),
      isFavorite: _.includes(favoritePlaygrounds, event.playground_id),
    }));

  const placemarks = state.events.upcoming.details.error ? [] :
    state.events.upcoming.details.map(event => ({
      latitude: event.playground_latitude,
      longitude: event.playground_longitude,
      info: {
        playgroundId: event.playground_id,
        title: event.event_title,
        datetime: moment(event.event_datetime).format('lll'),
      },
    }));

  return {
    events,
    placemarks,
    userId,
    isLoading,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getUpcomingEvents,
    subscribeEventControl,
    favoritePlaygroundControl,
  }, dispatch),
});

UpcomingEvents.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(UpcomingEvents);
