import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getEvent } from '../../actions/events';
import Map from '../../components/Map';
import EventDetails from '../../components/Events/EventDetails';

const propTypes = {
  match: PropTypes.object,
  currentEvent: PropTypes.array,
  singleEvent: PropTypes.object,
  actions: PropTypes.shape({
    getEvent: PropTypes.func,
  }),
};

class EventDetailsWrapper extends Component {
  componentDidMount() {
    const id = this.props.match.params.eventId;
    this.props.actions.getEvent(id);
  }

  render() {
    const { currentEvent, singleEvent } = this.props;
    return (
      <div className="content-container">
        <div className="left-content-box">
          <EventDetails event={singleEvent} />
        </div>
        <div className="map-container">
          <Map events={currentEvent} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentEvent: state.currentEventDetails.details ? state.currentEventDetails.details : [],
  singleEvent: state.currentEventDetails.details ? state.currentEventDetails.details[0] : {},
});


const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getEvent,
  }, dispatch),
});

EventDetailsWrapper.propTypes = propTypes;
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EventDetailsWrapper));
