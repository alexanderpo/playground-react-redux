import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Avatar as UserPhoto } from 'material-ui';
import UserProfilePhoto from '../../styles/images/user.png';

const styles = {
  userMenuInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexFlow: 'row',
  },
  userMenuInfoTextContainer: {
    fontSize: '15px',
    fontWeight: '500',
    display: 'flex',
    flexWrap: 'wrap',
    flexFlow: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    margin: '3px 5px 0px 0px',
    color: 'rgb(255, 255, 255)',
  },
};

const propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  image: PropTypes.string,
};

class UserMenuInfo extends Component {
  render() {
    const { name, email, image } = this.props;
    return (
      <div style={styles.userMenuInfoContainer} className="user-menu-info-container">
        <div style={styles.userMenuInfoTextContainer} className="user-menu-info-text-container">
          <span className="user-menu-info-name">{name}</span>
          <span className="user-menu-info-email">{email}</span>
        </div>
        <UserPhoto
          size={40}
          src={(image === null) ? UserProfilePhoto : `/api/v1/images/${image}`}
        />
      </div>
    );
  }
}

UserMenuInfo.propTypes = propTypes;
export default UserMenuInfo;
