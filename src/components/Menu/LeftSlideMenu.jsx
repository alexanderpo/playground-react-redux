import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Drawer, MenuItem, AppBar, Divider } from 'material-ui';
/* Material icons */
import EventsIcon from 'material-ui/svg-icons/action/event';
import MyEventsIcon from 'material-ui/svg-icons/image/nature';
import VisitedEventsIcon from 'material-ui/svg-icons/image/nature-people';
import PlaygroundIcon from 'material-ui/svg-icons/maps/layers';
import FavoriteIcon from 'material-ui/svg-icons/action/stars';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import CreatePlaygroundIcon from 'material-ui/svg-icons/av/playlist-add';
import CreateEventIcon from 'material-ui/svg-icons/maps/add-location';
import LogoutIcon from 'material-ui/svg-icons/action/exit-to-app';
import UserMenuInfo from '../User/UserMenuInfo';

const propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func,
};

class LeftSlideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  handleClose = () => this.setState({ open: false });

  render() {
    const { user, logout } = this.props;
    return (
      <div>
        <AppBar
          onLeftIconButtonTouchTap={this.handleToggle}
        />
        <Drawer
          docked={false}
          width={250}
          open={this.state.open}
          onRequestChange={open => this.setState({ open })}
        >
          <AppBar
            onLeftIconButtonTouchTap={this.handleToggle}
            iconElementRight={
              <UserMenuInfo
                name={user.name}
                email={user.email}
                image={user.image}
              />
            }
          />
          <MenuItem disabled={true} style={{ textAlign: 'center' }}>Events</MenuItem>
          <Divider />
          <MenuItem
            primaryText="Events"
            leftIcon={<EventsIcon />}
            containerElement={<Link to="/events" />}
            onClick={() => this.setState({ open: false })}
          />
          <MenuItem
            primaryText="My events"
            leftIcon={<MyEventsIcon />}
            containerElement={<Link to={`/${user.id}/events`} />}
            onClick={() => this.setState({ open: false })}
          />
          <MenuItem
            primaryText="Upcoming events"
            leftIcon={<VisitedEventsIcon />}
            containerElement={<Link to="/events/upcoming" />}
            onClick={() => this.setState({ open: false })}
          />
          <Divider />
          <MenuItem disabled={true} style={{ textAlign: 'center' }}>Playgrounds</MenuItem>
          <Divider />
          <MenuItem
            primaryText="Playgrounds"
            leftIcon={<PlaygroundIcon />}
            containerElement={<Link to="/playgrounds" />}
            onClick={() => this.setState({ open: false })}
          />
          <MenuItem
            primaryText="Favorites"
            leftIcon={<FavoriteIcon />}
            containerElement={<Link to="/playgrounds/favorites" />}
            onClick={() => this.setState({ open: false })}
          />
          <Divider />
          <MenuItem disabled={true} style={{ textAlign: 'center' }}>Create</MenuItem>
          <Divider />
          <MenuItem
            primaryText="Event"
            leftIcon={<CreateEventIcon />}
            containerElement={<Link to="/events/create" />}
            onClick={() => this.setState({ open: false })}
          />
          <MenuItem
            primaryText="Playground"
            leftIcon={<CreatePlaygroundIcon />}
            containerElement={<Link to="/playgrounds/create" />}
            onClick={() => this.setState({ open: false })}
          />
          <Divider />
          <MenuItem
            primaryText="Settings"
            leftIcon={<SettingsIcon />}
            containerElement={<Link to={`/${user.id}/profile`} />}
            onClick={() => this.setState({ open: false })}
          />
          <MenuItem
            primaryText="Logout"
            leftIcon={<LogoutIcon />}
            containerElement={<Link to="/signin" />}
            onClick={logout}
          />
        </Drawer>
      </div>
    );
  }
}

LeftSlideMenu.propTypes = propTypes;
export default LeftSlideMenu;
