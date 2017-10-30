import React, { Component } from 'react';
import { RaisedButton } from 'material-ui';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started and save to reload.
        </p>
        <RaisedButton
          className="sign-in-button"
          label="Sign In"
          primary={true}
        />
      </div>
    );
  }
}

export default App;
