import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUserEvents } from '../../actions/user';

const propTypes = {
  match: PropTypes.object,
  actions: PropTypes.shape({
    getUserEvents: PropTypes.func,
  }),
};

class UserEvents extends Component {
  componentDidMount() {
    const id = this.props.match.params.userId;
    this.props.actions.getUserEvents(id);
  }

  render() {
    return (
      <h2>user events</h2>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getUserEvents,
  }, dispatch),
});

UserEvents.propTypes = propTypes;
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserEvents));
