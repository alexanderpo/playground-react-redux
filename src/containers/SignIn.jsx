import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { TextField, RaisedButton } from 'material-ui';
import PasswordField from 'material-ui-password-field';
import Logo from '../components/Logo';

const propTypes = {
  history: PropTypes.object.isRequired,
};

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.handleInputValue = this.handleInputValue.bind(this);
    this.handleKeyPressEnter = this.handleKeyPressEnter.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
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
      this.handleSignIn();
    }
  }

  handleSignIn() {
    console.log(this.state);
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <div className="sign-wrapper">
          <Logo />
          <TextField
            hintText="Email"
            floatingLabelText="Email"
            value={email}
            onChange={this.handleInputValue('email')}
            onKeyPress={this.handleKeyPressEnter}
          />
          <PasswordField
            floatingLabelText="Password"
            className="sign-password-field"
            type="password"
            value={password}
            onChange={this.handleInputValue('password')}
            onKeyPress={this.handleKeyPressEnter}
          />
          <RaisedButton
            className="sign-in-button"
            label="Sign In"
            primary={true}
            onClick={this.handleSignIn}
          />
          <RaisedButton
            className="back-sign-up-button"
            label="Sign Up"
            onClick={() => this.props.history.push('/signup')}
          />
        </div>
      </div>
    );
  }
}

SignIn.propTypes = propTypes;
export default withRouter(SignIn);
