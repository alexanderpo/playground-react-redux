import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { TextField, RaisedButton, Avatar, Toggle, Snackbar, Paper, FloatingActionButton } from 'material-ui';
import EditIconButton from 'material-ui/svg-icons/editor/mode-edit';
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
      oldPassword: '',
      password: '',
      previewImage: this.props.data.image,
      selectedImage: [],
      passwordToggleIsOpen: false,
      isEdit: false,
      error: {
        name: '',
        phone: '',
        oldPassword: '',
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
      oldPassword: '',
      password: '',
      error: { oldPassword: '', password: '' },
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
        oldPassword: '',
        password: '',
      },
    });
  }

  handleSaveChanges() {
    const { updateProfile, data } = this.props;
    const {
      name,
      phone,
      oldPassword,
      password,
      passwordToggleIsOpen,
    } = this.state;
    const values = {
      name,
      phone,
      passwordToggleIsOpen,
      oldPassword,
      password,
    };
    const error = validate(updateUserProfileSchema, values);

    if (!_.isEmpty(error)) {
      this.setState({
        error: {
          name: error.name,
          phone: error.phone,
          oldPassword: error.oldPassword,
          password: error.password,
        },
      });
    } else {
      this.clearErrorFields();
      updateProfile(data.id, name, phone, oldPassword, password, passwordToggleIsOpen)
        .then((action) => {
          if (action.payload.error) {
            this.setState({
              dialogBoxIsOpen: true,
              dialogBoxText: action.payload.error,
            });
          } else {
            this.setState({
              passwordToggleIsOpen: false,
              isEdit: false,
              dialogBoxIsOpen: true,
              dialogBoxText: 'Profile updated',
            });
          }
        });
    }
  }

  renderEditableFields = () => (
    <div className="profile-content__editable">
      <TextField
        className="profile-content__input"
        hintText="Name"
        fullWidth={true}
        value={this.state.name}
        errorText={this.state.error.name}
        onKeyPress={this.handleKeyPressEnter}
        onChange={this.handleInputValue('name')}
      />
      <TextField
        className="profile-content__input"
        hintText="Phone"
        value={this.state.phone}
        errorText={this.state.error.phone}
        onKeyPress={this.handleKeyPressEnter}
        onChange={this.handleInputValue('phone')}
      />
      <Toggle
        className="profile-content__change-password-toggle"
        label="Change password"
        toggled={this.state.passwordToggleIsOpen}
        onToggle={this.handlePasswordToggle}
      />
      { this.state.passwordToggleIsOpen ?
        <div className="profile-content__change-password-wrapper">
          <TextField
            className="profile-content__input"
            type="password"
            hintText="Old password"
            value={this.state.oldPassword}
            errorText={this.state.error.oldPassword}
            onKeyPress={this.handleKeyPressEnter}
            onChange={this.handleInputValue('oldPassword')}
          />
          <TextField
            className="profile-content__input"
            type="password"
            hintText="New password"
            value={this.state.password}
            errorText={this.state.error.password}
            onKeyPress={this.handleKeyPressEnter}
            onChange={this.handleInputValue('password')}
          />
        </div> : null
      }
      <RaisedButton
        label="Save"
        primary={true}
        onClick={this.handleSaveChanges}
      />
    </div>
  );

  render() {
    const {
      previewImage,
      isEdit,
      dialogBoxIsOpen,
      dialogBoxText,
    } = this.state;
    const { data } = this.props;

    return (
      <Paper className="user-profile__container">
        <div className="user-profile__content">
          <div className="profile-image__container">
            <Avatar
              size={90}
              className="profile-image__content"
              src={(previewImage === null) ? UserProfilePhoto : `/api/v1/images/${previewImage}`}
              onClick={() => { document.getElementById('profile-image__input').click(); }}
            />
            <input
              id="profile-image__input"
              type="file"
              accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|images/*"
              onChange={this.handleProfileImage}
            />
          </div>
          <div className="profile-content__container">
            { !isEdit ? (
              <div className="profile-content__preview">
                <span className="profile-content__bold-text">{data.name}</span>
                <span className="profile-content__text">{data.phone}</span>
                <span className="profile-content__text">{data.email}</span>
                <span className="profile-content__count-text">{data.createdEvents} events organised</span>
              </div>) : this.renderEditableFields()
            }
          </div>
        </div>
        <div className="profile-edit-button__container">
          <FloatingActionButton
            className="profile-edit-button__content"
            onClick={() => this.setState({ isEdit: !isEdit })}
            mini={true}
          >
            <EditIconButton className="profile-edit-button__icon" />
          </FloatingActionButton>
        </div>
        <Snackbar
          open={dialogBoxIsOpen}
          message={dialogBoxText}
          autoHideDuration={4000}
          onRequestClose={() => { this.setState({ dialogBoxIsOpen: false }); }}
        />
      </Paper>
    );
  }
}

UserProfile.propTypes = propTypes;
export default UserProfile;
