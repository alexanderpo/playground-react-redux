import React, { Component } from 'react';
import { RaisedButton } from 'material-ui';
import logo from './logo.svg';
import './App.css';
import Map from './components/Map';

const eventsData = [ // TODO: build event data from playground with event
  {
    lat: -23.363,
    lng: 123.044,
    title: 'Первый ивент',
    description: 'blablablablbalbalba',
    creator: 'alexpo',
    dateTime: '25.02.2017 8:35',
  },
  {
    lat: -26.363,
    lng: 133.044,
    title: 'Второй ивент',
    description: 'blablablablbalbalba',
    creator: 'Darya',
    dateTime: '25.02.2017 8:35',
  },
  {
    lat: -28.363,
    lng: 101.044,
    title: 'Третий ивент',
    description: 'blablablablbalbalba',
    creator: 'Helen',
    dateTime: '25.02.2017 8:35',
  },
];

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
        <Map events={eventsData} />
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
