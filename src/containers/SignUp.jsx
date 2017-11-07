import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { TextField, RaisedButton, Snackbar } from 'material-ui';
import PasswordField from 'material-ui-password-field';
import Logo from '../components/Logo';
import { signUp } from '../actions/user';
import { signUpSchema } from '../utils/validationSchema';
import validate from '../utils/validation';

const propTypes = {
  history: PropTypes.object.isRequired,
  actions: PropTypes.shape({
    signUp: PropTypes.func,
  }),
};

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      error: {
        name: '',
        email: '',
        password: '',
        rePassword: '',
      },
      dialogBoxIsOpen: false,
      dialogBoxText: '',
    };

    this.handleInputValue = this.handleInputValue.bind(this);
    this.handleKeyPressEnter = this.handleKeyPressEnter.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.clearInputFields = this.clearInputFields.bind(this);
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
      this.handleSignUp();
    }
  }

  clearInputFields() {
    this.setState({
      name: '',
      email: '',
      password: '',
      rePassword: '',
    });
  }

  clearErrorFields() {
    this.setState({
      error: {
        name: '',
        email: '',
        password: '',
        rePassword: '',
      },
    });
  }

  handleSignUp() {
    const { actions } = this.props;
    const {
      name,
      email,
      password,
      rePassword,
    } = this.state;
    const values = {
      name,
      email,
      password,
      rePassword,
    };
    const error = validate(signUpSchema, values);

    if (!_.isEmpty(error)) {
      this.setState({
        error: {
          name: error.name,
          email: error.email,
          password: error.password,
          rePassword: error.rePassword,
        },
      });
    } else {
      this.clearErrorFields();
      actions.signUp(name, email, password, rePassword)
        .then((action) => {
          if (action.payload.error) {
            this.setState({
              dialogBoxIsOpen: true,
              dialogBoxText: action.payload.error,
            });
          } else {
            this.setState({
              dialogBoxIsOpen: true,
              dialogBoxText: 'Now you can Sign In',
            });
            this.clearInputFields();
            setTimeout(() => {
              this.props.history.push('/signin');
            }, 2500);
          }
        });
    }
  }

  render() {
    const {
      name,
      email,
      password,
      rePassword,
      error,
      dialogBoxIsOpen,
      dialogBoxText,
    } = this.state;

    return (
      <div>
        <div className="sign-wrapper">
          <Logo />
          <TextField
            hintText="Name"
            floatingLabelText="Name"
            value={name}
            errorText={error.name}
            onChange={this.handleInputValue('name')}
            onKeyPress={this.handleKeyPressEnter}
          />
          <TextField
            hintText="Email"
            floatingLabelText="Email"
            value={email}
            errorText={error.email}
            onChange={this.handleInputValue('email')}
            onKeyPress={this.handleKeyPressEnter}
          />
          <TextField
            hintText="Enter password"
            floatingLabelText="Password"
            type="password"
            value={password}
            errorText={error.password}
            onChange={this.handleInputValue('password')}
            onKeyPress={this.handleKeyPressEnter}
          />
          <PasswordField
            floatingLabelText="Repeat password"
            className="sign-password-field"
            type="password"
            value={rePassword}
            errorText={error.rePassword}
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
        <Snackbar
          className="sign-dialog-box"
          open={dialogBoxIsOpen}
          message={dialogBoxText}
          autoHideDuration={4000}
          onRequestClose={() => { this.setState({ dialogBoxIsOpen: false }); }}
        />
      </div>
    );
  }
}

// const mapStateToProps = state => ({
//
// });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    signUp,
  }, dispatch),
});

SignUp.propTypes = propTypes;
export default withRouter(connect(null, mapDispatchToProps)(SignUp));
