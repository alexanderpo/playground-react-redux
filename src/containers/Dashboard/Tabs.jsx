import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { Paper, Tabs, Tab } from 'material-ui';
import DashboardTable from '../../components/Profile/Dashboard/Table';
import { getFavoritePlaygrounds, getUserEvents, getUserPlaygrounds } from '../../actions/user';

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
      case 'playgrounds':
        return actions.getUserPlaygrounds(userId);
      case 'events':
        return actions.getUserEvents(userId);
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
    } = this.props;

    return (
      <Paper zDepth={2}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChangeTabs}
        >
          <Tab label="Favorite" value="favorite">
            <div>
              <DashboardTable
                content={favPlaygrounds}
                isLoading={favPlaygroundsIsLoading}
              />
              <div>Pagination</div>
            </div>
          </Tab>
          <Tab label="My playgrounds" value="playgrounds">
            <div>
              <DashboardTable
                content={playgrounds}
                isLoading={playgroundsIsLoading}
              />
              <div>Pagination</div>
            </div>
          </Tab>
          <Tab label="My events" value="events">
            <div>
              <DashboardTable
                content={events}
                isLoading={eventsIsLoading}
              />
              <div>Pagination</div>
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
      description: moment(ev.event_created_at).format('lll'),
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
  }, dispatch),
});

DashboardTabs.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(DashboardTabs);
