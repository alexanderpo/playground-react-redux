import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Map from '../../components/Map';
import { getEvent } from '../../actions/events';

const propTypes = {
  match: PropTypes.object,
  currentEvent: PropTypes.array,
  actions: PropTypes.shape({
    getEvent: PropTypes.func,
  }),
};

class EventDetails extends Component {
  componentDidMount() {
    const id = this.props.match.params.eventId;
    this.props.actions.getEvent(id);
  }

  render() {
    const { currentEvent } = this.props;
    return (
      <div className="content-container">
        <div className="left-content-box">
          asdada
        </div>
        <div className="map-container">
          <Map events={currentEvent} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state.currentEventDetails.details);
  return {
    currentEvent: state.currentEventDetails.details ? state.currentEventDetails.details : [],
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getEvent,
  }, dispatch),
});

EventDetails.propTypes = propTypes;
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EventDetails));
