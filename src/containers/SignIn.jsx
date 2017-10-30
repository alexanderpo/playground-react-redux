import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { TextField, RaisedButton } from 'material-ui';
import PasswordField from 'material-ui-password-field';
import Logo from '../components/Logo';

class SignIn extends Component {
  render() {
    return (
      <div>
        <div className="sign-wrapper">
          <Logo />
          <TextField
            hintText="Email"
            floatingLabelText="Email"
          />
          <PasswordField
            floatingLabelText="Password"
            type="password"
          />
          <RaisedButton
            className="sign-in-button"
            label="Sign In"
            primary={true}
          />
          <RaisedButton
            className="back-sign-up-button"
            label="Sign Up"
            primary={true}
            onClick={() => this.props.history.push('/signup')}
          />
        </div>
      </div>
    );
  }
}

// SignIn.propTypes = propTypes;
export default withRouter(SignIn);
