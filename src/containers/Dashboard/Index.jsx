import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateProfile, updateProfileImage, getOrganisedEvents } from '../../actions/user';
import { createImage, removeImage } from '../../actions/images';
import UserProfile from '../../components/Profile/UserProfile';
import DashboardTabs from './Tabs';
import DashboardCalendar from './Calendar';

const propTypes = {
  data: PropTypes.object,
  actions: PropTypes.shape({
    getOrganisedEvents: PropTypes.func,
    updateProfileImage: PropTypes.func,
    updateProfile: PropTypes.func,
    createImage: PropTypes.func,
    removeImage: PropTypes.func,
  }),
};

class UserDashboard extends Component {
  componentDidMount = () => {
    const { data, actions } = this.props;
    actions.getOrganisedEvents(data.id);
  };

  render() {
    const { data, actions } = this.props;
    return (
      <div>
        <div style={{ display: 'none' }} className="user-dashboard__left-column">
          <UserProfile
            data={data}
            createImage={actions.createImage}
            removeImage={actions.removeImage}
            updateProfile={actions.updateProfile}
            updateProfileImage={actions.updateProfileImage}
          />
          <DashboardTabs />
        </div>
        <div className="user-dashboard__right-column">
          <DashboardCalendar />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.user.details,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getOrganisedEvents,
    updateProfileImage,
    updateProfile,
    createImage,
    removeImage,
  }, dispatch),
});

UserDashboard.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);
