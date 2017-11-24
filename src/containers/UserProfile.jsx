import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateProfile } from '../actions/user';
import UserProfile from '../components/Profile/UserProfile';

const propTypes = {
  data: PropTypes.object,
  actions: PropTypes.shape({
    updateProfile: PropTypes.func,
  }),
};

class UserProfileWrapper extends Component {
  render() {
    const { data, actions } = this.props;
    return (
      <UserProfile
        data={data}
        updateProfile={actions.updateProfile}
      />
    );
  }
}

const mapStateToProps = state => ({
  data: state.user.details,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    updateProfile,
  }, dispatch),
});

UserProfileWrapper.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(UserProfileWrapper);
