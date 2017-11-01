import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Drawer, MenuItem, RaisedButton, AppBar } from 'material-ui';
import NavigationMenuIcon from 'material-ui/svg-icons/navigation/menu';

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

const propTypes = {
  children: PropTypes.object.isRequired,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  handleClose = () => this.setState({ open: false });

  render() {
    return (
      <div className="App">
        <div>
          <AppBar
            onLeftIconButtonTouchTap={this.handleToggle}
          />
          <Drawer
            docked={false}
            width={200}
            open={this.state.open}
            onRequestChange={open => this.setState({ open })}
          >
            <AppBar
              onLeftIconButtonTouchTap={this.handleToggle}
            />
            <MenuItem>Menu Item</MenuItem>
            <MenuItem>Menu Item 2</MenuItem>
          </Drawer>
        </div>
        <div>
          { this.props.children }
        </div>
      </div>
    );
  }
}

App.propTypes = propTypes;
export default App;
