import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateProfile, updateProfileImage } from '../actions/user';
import { createImage, removeImage } from '../actions/images';
import UserProfile from '../components/Profile/UserProfile';

const propTypes = {
  data: PropTypes.object,
  actions: PropTypes.shape({
    updateProfileImage: PropTypes.func,
    updateProfile: PropTypes.func,
    createImage: PropTypes.func,
    removeImage: PropTypes.func,
  }),
};

class UserProfileWrapper extends Component {
  render() {
    const { data, actions } = this.props;
    return (
      <UserProfile
        data={data}
        createImage={actions.createImage}
        removeImage={actions.removeImage}
        updateProfile={actions.updateProfile}
        updateProfileImage={actions.updateProfileImage}
      />
    );
  }
}

const mapStateToProps = state => ({
  data: state.user.details,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    updateProfileImage,
    updateProfile,
    createImage,
    removeImage,
  }, dispatch),
});

UserProfileWrapper.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(UserProfileWrapper);
