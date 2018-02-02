import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { TextField, RaisedButton, Snackbar, Paper } from 'material-ui';
import PasswordField from 'material-ui-password-field';
import { signInSchema } from '../utils/validationSchema';
import validate from '../utils/validation';
import Logo from '../components/Logo';
import { signIn, updateNotificationStatus } from '../actions/user';

const propTypes = {
  history: PropTypes.object,
  actions: PropTypes.shape({
    signIn: PropTypes.func,
    updateNotificationStatus: PropTypes.func,
  }),
};

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: {
        email: '',
        password: '',
      },
      dialogBoxIsOpen: false,
      dialogBoxText: '',
    };

    this.handleInputValue = this.handleInputValue.bind(this);
    this.handleKeyPressEnter = this.handleKeyPressEnter.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
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
      this.handleSignIn();
    }
  }

  clearInputFields() {
    this.setState({
      email: '',
      password: '',
    });
  }

  clearErrorFields() {
    this.setState({
      error: {
        email: '',
        password: '',
      },
    });
  }

  handleSignIn() {
    const { email, password } = this.state;
    const { actions, history } = this.props;
    const values = { email, password };
    const error = validate(signInSchema, values);

    if (!_.isEmpty(error)) {
      this.setState({
        error: {
          email: error.email,
          password: error.password,
        },
      });
    } else {
      this.clearErrorFields();
      actions.signIn(email, password)
        .then((action) => {
          if (action.payload.error) {
            this.setState({
              dialogBoxIsOpen: true,
              dialogBoxText: action.payload.error,
            });
          } else {
            this.clearInputFields();
            history.push('/');
          }
        });
    }
  }

  render() {
    const {
      email,
      password,
      error,
      dialogBoxIsOpen,
      dialogBoxText,
    } = this.state;

    return (
      <div className="sign-wrapper">
        <Paper className="sign-content">
          <Logo />
          <div className="sign-fields">
            <TextField
              hintText="Please enter your email"
              floatingLabelText="Email"
              value={email}
              fullWidth={true}
              errorText={error.email}
              onChange={this.handleInputValue('email')}
              onKeyPress={this.handleKeyPressEnter}
            />
            <PasswordField
              fullWidth={true}
              floatingLabelText="Password"
              className="sign-password-field"
              type="password"
              value={password}
              errorText={error.password}
              onChange={this.handleInputValue('password')}
              onKeyPress={this.handleKeyPressEnter}
            />
          </div>
          <div className="sign-actions">
            <RaisedButton
              className="sign-in-button"
              label="Sign In"
              primary={true}
              onClick={this.handleSignIn}
            />
            <RaisedButton
              className="sign-up-button"
              label="Sign Up"
              onClick={() => this.props.history.push('/signup')}
            />
          </div>
        </Paper>
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
    signIn,
    updateNotificationStatus,
  }, dispatch),
});

SignIn.propTypes = propTypes;
export default withRouter(connect(null, mapDispatchToProps)(SignIn));
