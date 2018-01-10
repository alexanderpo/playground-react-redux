import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { logout, updateNotificationStatus } from './actions/user';
import LeftSlideMenu from './components/Menu/LeftSlideMenu';
import MessageBar from './components/MessageBar';

const propTypes = {
  children: PropTypes.object.isRequired,
  user: PropTypes.object,
  notification: PropTypes.object,
  actions: PropTypes.shape({
    logout: PropTypes.func,
    updateNotificationStatus: PropTypes.func,
  }),
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  handleClose = () => this.setState({ open: false });

  render() {
    const { user, actions, notification } = this.props;
    return (
      <div>
        <LeftSlideMenu user={user} logout={actions.logout} />
        <div>
          { this.props.children }
        </div>
        <MessageBar
          show={notification.show}
          message={notification.message}
          type={notification.type}
          clearNotifyStatus={actions.updateNotificationStatus}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.details,
  notification: state.notification,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    logout,
    updateNotificationStatus,
  }, dispatch),
});

App.propTypes = propTypes;
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
