import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import classNames from 'classnames';
import { Paper, Tabs, Tab } from 'material-ui';
import DashboardTable from '../../components/Profile/Dashboard/Table';
import {
  getFavoritePlaygrounds,
  getUserEvents,
  getUserPlaygrounds,
  favoritePlaygroundControl,
} from '../../actions/user';
import { deleteEvent } from '../../actions/events';
import { deletePlayground } from '../../actions/playgrounds';

const propTypes = {
  userId: PropTypes.number,
  playgroundsIsLoading: PropTypes.bool,
  favPlaygroundsIsLoading: PropTypes.bool,
  eventsIsLoading: PropTypes.bool,
  playgrounds: PropTypes.array,
  favPlaygrounds: PropTypes.array,
  events: PropTypes.array,
  actions: PropTypes.shape({
    getUserPlaygrounds: PropTypes.func,
    getFavoritePlaygrounds: PropTypes.func,
    getUserEvents: PropTypes.func,
    favoritePlaygroundControl: PropTypes.func,
    deleteEvent: PropTypes.func,
    deletePlayground: PropTypes.func,
  }),
};

class DashboardTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'favorite',
    };
  }

  componentDidMount = () => {
    this.handleChangeTabs(this.state.value);
  };

  handleChangeTabs = (value) => {
    const { userId, actions } = this.props;
    this.setState({ value });
    switch (value) {
      case 'favorite':
        return actions.getFavoritePlaygrounds(userId);
      case 'events':
        return actions.getUserEvents(userId);
      case 'playgrounds':
        return actions.getUserPlaygrounds(userId);
      default:
        return false;
    }
  };

  render() {
    const {
      playgroundsIsLoading,
      favPlaygroundsIsLoading,
      eventsIsLoading,
      playgrounds,
      favPlaygrounds,
      events,
      actions,
    } = this.props;
    const { value } = this.state;

    return (
      <Paper className="dashboard-table-tabs__wrapper">
        <Tabs
          value={this.state.value}
          onChange={this.handleChangeTabs}
        >
          <Tab
            label="Favorite"
            value="favorite"
            className={classNames({
              'dashboard-table__tab-active': value === 'favorite',
              'dashboard-table__tab': value !== 'favorite',
            })}
          >
            <div>
              <DashboardTable
                value={value}
                content={favPlaygrounds}
                isLoading={favPlaygroundsIsLoading}
                actions={{
                  remove: actions.favoritePlaygroundControl,
                  update: actions.getFavoritePlaygrounds,
                }}
              />
            </div>
          </Tab>
          <Tab
            label="My events"
            value="events"
            className={classNames({
              'dashboard-table__tab-active': value === 'events',
              'dashboard-table__tab': value !== 'events',
            })}
          >
            <div>
              <DashboardTable
                value={value}
                content={events}
                isLoading={eventsIsLoading}
                actions={{
                  remove: actions.deleteEvent,
                  update: actions.getUserEvents,
                }}
              />
            </div>
          </Tab>
          <Tab
            label="My playgrounds"
            value="playgrounds"
            className={classNames({
              'dashboard-table__tab-active': value === 'playgrounds',
              'dashboard-table__tab': value !== 'playgrounds',
            })}
          >
            <div>
              <DashboardTable
                value={value}
                content={playgrounds}
                isLoading={playgroundsIsLoading}
                actions={{
                  remove: actions.deletePlayground,
                  update: actions.getUserPlaygrounds,
                }}
              />
            </div>
          </Tab>
        </Tabs>
      </Paper>
    );
  }
}

const mapStateToProps = (state) => {
  const favPlaygroundsIsLoading = state.playgrounds.favorites.isLoading;
  const favPlaygrounds = state.playgrounds.favorites.details.error ? [] :
    state.playgrounds.favorites.details.map(pg => ({
      id: pg.id,
      title: pg.name,
      description: pg.address,
    }));

  const playgroundsIsLoading = state.playgrounds.user.isLoading;
  const playgrounds = state.playgrounds.user.details.error ? [] :
    state.playgrounds.user.details.map(pl => ({
      id: pl.id,
      title: pl.name,
      description: pl.address,
    }));

  const eventsIsLoading = state.events.user.isLoading;
  const events = state.events.user.details.error ? [] :
    state.events.user.details.map(ev => ({
      id: ev.event_id,
      title: ev.event_title,
      description: moment(ev.event_datetime).format('lll'),
    }));

  return {
    playgroundsIsLoading,
    playgrounds,
    favPlaygroundsIsLoading,
    favPlaygrounds,
    eventsIsLoading,
    events,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getUserPlaygrounds,
    getFavoritePlaygrounds,
    getUserEvents,
    favoritePlaygroundControl,
    deleteEvent,
    deletePlayground,
  }, dispatch),
});

DashboardTabs.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(DashboardTabs);
