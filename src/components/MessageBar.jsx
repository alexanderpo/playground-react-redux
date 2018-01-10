import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Snackbar } from 'material-ui';
import CheckedIcon from 'material-ui/svg-icons/action/check-circle';
import WarningIcon from 'material-ui/svg-icons/alert/warning';

const propTypes = {
  show: PropTypes.bool,
  message: PropTypes.string,
  type: PropTypes.string,
  clearNotifyStatus: PropTypes.func,
};

class MessageBar extends Component {
  renderIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckedIcon className="notification_success__icon" />;
      case 'failure':
        return <WarningIcon className="notification_warning__icon" />;
      default:
        return '';
    }
  };

  render() {
    const {
      type,
      show,
      message,
      clearNotifyStatus,
    } = this.props;
    return (
      <Snackbar
        className="notification-bar__container"
        open={show}
        message={
          <div className="notification-bar__content">
            <span>{message}</span>
            {this.renderIcon(type)}
          </div>
        }
        autoHideDuration={4000}
        onRequestClose={() => clearNotifyStatus({ show: false, message: '', type: '' })}
      />
    );
  }
}

MessageBar.propTypes = propTypes;
export default MessageBar;
