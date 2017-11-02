import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TextField, RaisedButton } from 'material-ui';
import PasswordField from 'material-ui-password-field';
import Logo from '../components/Logo';
import { signIn } from '../actions/user';

const propTypes = {
  history: PropTypes.object.isRequired,
  actions: PropTypes.shape({
    signIn: PropTypes.func,
  }),
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
    this.props.actions.signIn(this.state.email, this.state.password)
      .then((res) => {
        // console.log(res.payload);
        // console.log(localStorage.getItem('user'));
      });
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

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    signIn,
  }, dispatch),
});

SignIn.propTypes = propTypes;
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));
