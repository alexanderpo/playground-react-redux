import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './components/Map';

const eventsData = [
  { // TODO: build event data from playground with event
    lat: 52.6704471,
    lng: 24.8366419,
    title: 'Первый ивент',
    description: 'blablablablbalbalba',
    creator: 'alexpo',
    dateTime: '25.02.2017 8:35',
  },
  {
    lat: 51.6704471,
    lng: 22.8366419,
    title: 'Второй ивент',
    description: 'blablablablbalbalba',
    creator: 'Darya',
    dateTime: '25.02.2017 8:35',
  },
  {
    lat: 51.4471,
    lng: 22.86419,
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
        <Map events={eventsData} />
      </div>
    );
  }
}

export default App;
