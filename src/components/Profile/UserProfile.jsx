import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { TextField, RaisedButton, Avatar, Toggle, Snackbar } from 'material-ui';
import PasswordField from 'material-ui-password-field';
import { updateUserProfileSchema } from '../../utils/validationSchema';
import validate from '../../utils/validation';
import UserProfilePhoto from '../../styles/images/user.png';

const propTypes = {
  data: PropTypes.object,
  updateProfile: PropTypes.func,
  updateProfileImage: PropTypes.func,
  createImage: PropTypes.func,
  removeImage: PropTypes.func,
};

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.data.name,
      phone: this.props.data.phone === null ? '+375(29)000-00-00' : this.props.data.phone,
      password: '',
      previewImage: this.props.data.image,
      selectedImage: [],
      passwordToggleIsOpen: false,
      error: {
        name: '',
        phone: '',
        password: '',
      },
      dialogBoxIsOpen: false,
      dialogBoxText: '',
    };

    this.handleProfileImage = this.handleProfileImage.bind(this);
    this.handleInputValue = this.handleInputValue.bind(this);
    this.handleSaveChanges = this.handleSaveChanges.bind(this);
    this.handleKeyPressEnter = this.handleKeyPressEnter.bind(this);
    this.handlePasswordToggle = this.handlePasswordToggle.bind(this);
    this.clearErrorFields = this.clearErrorFields.bind(this);
  }

  handleInputValue(key) {
    return (event) => {
      this.setState({
        [key]: event.target.value,
      });
    };
  }

  handleKeyPressEnter(event) {
    if (event.key === 'Enter') {
      this.handleSaveChanges();
    }
  }

  handlePasswordToggle() {
    const { passwordToggleIsOpen } = this.state;
    this.setState({
      password: '',
      passwordToggleIsOpen: !passwordToggleIsOpen,
    });
  }

  handleProfileImage(event) {
    const {
      createImage,
      removeImage,
      updateProfileImage,
      data,
    } = this.props;
    const { selectedImage } = this.state;
    const file = event.target.files[0];
    if (!_.isEmpty(selectedImage)) {
      removeImage(selectedImage.id);
    }
    createImage(file).then((action) => {
      if (!action.payload.error) {
        const newImage = {
          minio_id: action.payload.id,
          original_name: action.payload.originalName,
        };
        updateProfileImage(data.id, newImage.minio_id, newImage.original_name).then(() => {
          this.setState({
            selectedImage: newImage,
            previewImage: action.payload.id,
          });
        });
      }
    });
  }

  clearErrorFields() {
    this.setState({
      error: {
        name: '',
        phone: '',
        password: '',
      },
    });
  }

  handleSaveChanges() {
    const { updateProfile, data } = this.props;
    const {
      name,
      phone,
      password,
      passwordToggleIsOpen,
    } = this.state;
    const values = {
      name,
      phone,
      passwordToggleIsOpen,
      password,
    };
    const error = validate(updateUserProfileSchema, values);

    if (!_.isEmpty(error)) {
      this.setState({
        error: {
          name: error.name,
          phone: error.phone,
          password: error.password,
        },
      });
    } else {
      this.clearErrorFields();
      updateProfile(data.id, name, phone, password, passwordToggleIsOpen)
        .then((action) => {
          if (action.payload.error) {
            this.setState({
              dialogBoxIsOpen: true,
              dialogBoxText: action.payload.error,
            });
          } else {
            this.setState({
              passwordToggleIsOpen: false,
              dialogBoxIsOpen: true,
              dialogBoxText: 'Profile updated',
            });
          }
        });
    }
  }

  render() {
    const {
      name,
      phone,
      password,
      previewImage,
      passwordToggleIsOpen,
      error,
      dialogBoxIsOpen,
      dialogBoxText,
    } = this.state;

    return (
      <div className="user-profile-box">
        <div className="user-profile-wrapper">
          <Avatar
            size={250}
            className="user-profile-image"
            src={(previewImage === null) ? UserProfilePhoto : `/api/v1/images/${previewImage}`}
            onClick={() => { document.getElementById('image-loader').click(); }}
          />
          <input
            id="image-loader"
            type="file"
            accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|images/*"
            onChange={this.handleProfileImage}
          />
          <TextField
            hintText="User name"
            floatingLabelText="Name"
            value={name}
            errorText={error.name}
            onKeyPress={this.handleKeyPressEnter}
            onChange={this.handleInputValue('name')}
          />
          <TextField
            hintText="Phone number"
            floatingLabelText="Phone"
            value={phone}
            errorText={error.phone}
            onKeyPress={this.handleKeyPressEnter}
            onChange={this.handleInputValue('phone')}
          />
          <TextField
            hintText="Email address"
            floatingLabelText="Email"
            value={this.props.data.email}
            disabled={true}
          />
          <Toggle
            className="change-password-toggle"
            label="Change password"
            toggled={passwordToggleIsOpen}
            onToggle={this.handlePasswordToggle}
          />
          { passwordToggleIsOpen ?
            <PasswordField
              style={{ width: '256px' }}
              floatingLabelText="Enter new password"
              type="password"
              value={password}
              errorText={error.password}
              onKeyPress={this.handleKeyPressEnter}
              onChange={this.handleInputValue('password')}
            /> : null
          }
          <RaisedButton
            className="save-button"
            label="Save changes"
            primary={true}
            onClick={this.handleSaveChanges}
          />
        </div>
        <Snackbar
          open={dialogBoxIsOpen}
          message={dialogBoxText}
          autoHideDuration={4000}
          onRequestClose={() => { this.setState({ dialogBoxIsOpen: false }); }}
        />
      </div>
    );
  }
}

UserProfile.propTypes = propTypes;
export default UserProfile;
