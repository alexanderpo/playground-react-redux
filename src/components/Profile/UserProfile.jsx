import React, { Component } from 'react';
import { TextField, RaisedButton, Avatar, Toggle } from 'material-ui';
import PasswordField from 'material-ui-password-field';
import UserProfilePhoto from '../../styles/images/user.png';

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      phone: '',
      password: '',
      image: '',
      passwordToggleIsOpen: false,
    };

    this.handleProfileImage = this.handleProfileImage.bind(this);
    this.handleInputValue = this.handleInputValue.bind(this);
    this.handleSaveChanges = this.handleSaveChanges.bind(this);
    this.handleKeyPressEnter = this.handleKeyPressEnter.bind(this);
    this.handlePasswordToggle = this.handlePasswordToggle.bind(this);
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
    const reader = new FileReader();
    const file = event.target.files[0];

    reader.onload = (upload) => {
      this.setState({
        image: upload.target.result,
      });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  handleSaveChanges() {
    console.log(this.state);
  }

  render() {
    const {
      name,
      email,
      phone,
      password,
      image,
      passwordToggleIsOpen,
    } = this.state;

    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="user-profile-wrapper">
          <Avatar
            size={250}
            className="user-profile-image"
            src={!image ? UserProfilePhoto : image}
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
            onKeyPress={this.handleKeyPressEnter}
            onChange={this.handleInputValue('name')}
          />
          <TextField
            hintText="Phone number"
            floatingLabelText="Phone"
            value={phone}
            onKeyPress={this.handleKeyPressEnter}
            onChange={this.handleInputValue('phone')}
          />
          <TextField
            hintText="Email address"
            floatingLabelText="Email"
            value={email}
            onKeyPress={this.handleKeyPressEnter}
            onChange={this.handleInputValue('email')}
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
      </div>
    );
  }
}

export default UserProfile;
