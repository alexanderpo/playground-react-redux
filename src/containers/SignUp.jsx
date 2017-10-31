import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { TextField, RaisedButton } from 'material-ui';
import PasswordField from 'material-ui-password-field';
import Logo from '../components/Logo';

const propTypes = {
  history: PropTypes.object.isRequired,
};

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      rePassword: '',
    };

    this.handleInputValue = this.handleInputValue.bind(this);
    this.handleKeyPressEnter = this.handleKeyPressEnter.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
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
      this.handleSignUp();
    }
  }

  handleSignUp() {
    console.log(this.state);
  }

  render() {
    const {
      name,
      email,
      password,
      rePassword,
    } = this.state;

    return (
      <div>
        <div className="sign-wrapper">
          <Logo />
          <TextField
            hintText="Name"
            floatingLabelText="Name"
            value={name}
            onChange={this.handleInputValue('name')}
            onKeyPress={this.handleKeyPressEnter}
          />
          <TextField
            hintText="Email"
            floatingLabelText="Email"
            value={email}
            onChange={this.handleInputValue('email')}
            onKeyPress={this.handleKeyPressEnter}
          />
          <TextField
            hintText="Enter password"
            floatingLabelText="Password"
            type="password"
            value={password}
            onChange={this.handleInputValue('password')}
            onKeyPress={this.handleKeyPressEnter}
          />
          <PasswordField
            floatingLabelText="Repeat password"
            className="sign-password-field"
            type="password"
            value={rePassword}
            onChange={this.handleInputValue('rePassword')}
            onKeyPress={this.handleKeyPressEnter}
          />
          <RaisedButton
            className="sign-up-button"
            label="Sign Up"
            primary={true}
            onClick={this.handleSignUp}
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

SignUp.propTypes = propTypes;
export default withRouter(SignUp);
