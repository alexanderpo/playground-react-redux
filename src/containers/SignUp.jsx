import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { TextField, RaisedButton } from 'material-ui';
import PasswordField from 'material-ui-password-field';
import Logo from '../components/Logo';

class SignUp extends Component {
  render() {
    return (
      <div>
        <div className="sign-wrapper">
          <Logo />
          <TextField
            hintText="Name"
            floatingLabelText="Name"
          />
          <TextField
            hintText="Email"
            floatingLabelText="Email"
          />
          <TextField
            hintText="Enter password"
            floatingLabelText="Password"
            type="password"
          />
          <PasswordField
            floatingLabelText="Repeat password"
            type="password"
          />
          <RaisedButton
            className="sign-up-button"
            label="Sign Up"
            primary={true}
          />
          <RaisedButton
            className="back-sign-up-button"
            label="Back"
            onClick={() => this.props.history.push('/signin')}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(SignUp);
