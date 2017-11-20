import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUpcomingEvents } from '../../actions/user';

const propTypes = {
  userId: PropTypes.number,
  actions: PropTypes.shape({
    getUpcomingEvents: PropTypes.func,
  }),
};

class UpcomingEvents extends Component {
  componentDidMount() {
    const { userId, actions } = this.props;
    actions.getUpcomingEvents(userId).then((res) => {
      console.log(res);
    });
  }

  render() {
    return (
      <h2>adada</h2>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.user.details.id,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getUpcomingEvents,
  }, dispatch),
});

UpcomingEvents.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(UpcomingEvents);
