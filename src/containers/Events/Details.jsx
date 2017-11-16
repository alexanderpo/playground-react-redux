import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { getEvent, updateSubscribers } from '../../actions/events';
import { subscribeEventControl } from '../../actions/user';
import Map from '../../components/Map';
import EventDetails from '../../components/Events/Details';

const propTypes = {
  match: PropTypes.object,
  userId: PropTypes.number,
  placemarks: PropTypes.array,
  singleEvent: PropTypes.object,
  actions: PropTypes.shape({
    getEvent: PropTypes.func,
    subscribeEventControl: PropTypes.func,
    updateSubscribers: PropTypes.func,
  }),
};

class EventDetailsWrapper extends Component {
  componentDidMount() {
    const id = this.props.match.params.eventId;
    this.props.actions.getEvent(id);
  }

  render() {
    const {
      placemarks,
      singleEvent,
      userId,
      actions,
    } = this.props;
    return (
      <div className="content-container">
        <div className="left-content-box">
          <EventDetails
            userId={userId}
            subscribeControl={actions.subscribeEventControl}
            updateSubscribers={actions.updateSubscribers}
            event={singleEvent}
          />
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
  const event = state.currentEvent.details ? state.currentEvent.details[0] : {};

  const singleEvent = Object.assign({}, event, {
    isSubscribe: _.includes(subscribedEvents, event.event_id),
  });

  const placemarks = state.currentEvent.details ? state.currentEvent.details.map(item => ({
    latitude: item.playground_latitude,
    longitude: item.playground_longitude,
    title: item.event_title,
    description: item.playground_description,
    datetime: moment(item.event_datetime).format('lll'),
    creator: item.creator_name,
  })) : [];

  return {
    userId,
    singleEvent,
    placemarks,
  };
};


const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getEvent,
    subscribeEventControl,
    updateSubscribers,
  }, dispatch),
});

EventDetailsWrapper.propTypes = propTypes;
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EventDetailsWrapper));
