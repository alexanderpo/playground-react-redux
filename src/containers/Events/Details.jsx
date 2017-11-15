import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { getEvent, updateSubscribers } from '../../actions/events';
import { subscribeEventControl } from '../../actions/user';
import Map from '../../components/Map';
import EventDetails from '../../components/Events/Details';

const propTypes = {
  match: PropTypes.object,
  userId: PropTypes.number,
  currentEvent: PropTypes.array,
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
      currentEvent,
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
          <Map events={currentEvent} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const userId = state.user.details.id;
  const { subscribedEvents } = state.user.details;
  const currentEvent = state.currentEventDetails.details ? state.currentEventDetails.details : [];
  const event = state.currentEventDetails.details ? state.currentEventDetails.details[0] : {};

  const singleEvent = Object.assign({}, event, {
    isSubscribe: _.includes(subscribedEvents, event.event_id),
  });

  return {
    userId,
    singleEvent,
    currentEvent,
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
