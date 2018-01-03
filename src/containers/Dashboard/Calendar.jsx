import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import _ from 'lodash';
import moment from 'moment';
import classNames from 'classnames';
import { Paper, DatePicker, IconButton, Divider, CircularProgress } from 'material-ui';
import MoreContentIcon from 'material-ui/svg-icons/navigation/more-horiz';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import ArrowIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import { getUpcomingEventsByDate } from '../../actions/user';
// import EventsSchedule from './EventsSchedule';

const propTypes = {
  userId: PropTypes.number,
  isLoading: PropTypes.bool,
  events: PropTypes.array,
  actions: PropTypes.shape({
    getUpcomingEventsByDate: PropTypes.func,
  }),
};

class DashboardCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };

    this.formatDate = this.formatDate.bind(this);
  }

  componentDidMount = () => {
    const { userId, actions } = this.props;
    const filteredDate = moment(this.state.date).format('YYYY-MM-DD');
    actions.getUpcomingEventsByDate(userId, filteredDate);
  };

  getThisWeekend = () => {
    const today = new Date();
    const nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
    return nextweek;
  }

  handleChangeDatePicker = (event, date) => {
    const { userId, actions } = this.props;
    this.setState({ date });
    const filteredDate = moment(date).format('YYYY-MM-DD');
    actions.getUpcomingEventsByDate(userId, filteredDate);
  };

  formatDate() {
    return moment(new Date(this.state.date)).format('l');
  }

  // TODO: open / show more info
  // TODO: unsubscribe from event with dynamic update table
  // TODO: added count of users whos gooing on event

  renderEvents = events => (
    !_.isEmpty(events) ? events.map(event => (
      <div key={event.event_id} className="calendar-content__column">
        <div className="calendar-main-content">
          <div className="calendar__info">
            { moment(event.event_datetime).format('H:MM') }
          </div>
          <div className="calendar__info calendar__title">
            <Link to={`/events/${event.event_id}`} title={event.event_title} className="calendar-info__title">
              {event.event_title}
            </Link> at <Link to={`/playgrounds/${event.playground_id}`} title={event.playground_name} className="calendar-info__title">{event.playground_name}</Link>
          </div>
          <div className="calendar__actions">
            <IconButton>
              <MoreContentIcon className="dashboard-events-calendar-table__more-content-icon" />
            </IconButton>
          </div>
        </div>
        <div className="calendar-more-content">
          <div>{event.playground_description}</div>
          <div className="calendar-more-content__stats">
            <span>Players - <span className="bolder__text">3</span></span>
            <span>Organiser - <span className="bolder__text">{event.creator_name}</span></span>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
        <Divider />
      </div>
    )) : (
      <div>Don&apos;t have event&apos;s on this date</div>
    )
  );

  render() {
    const { isLoading, events } = this.props;
    return (
      <div className="dashboard-events-calendar__wrapper">
        <span className="dashboard-events-calendar__title">Upcoming events</span>
        <Paper className="dashboard-events-calendar-date-picker__container">
          <div className="dashboard-events-calendar-date-picker__date-text">
            { moment(this.state.date).format('DD.MM.YY') }
          </div>
          <div className="dashboard-events-calendar-date-picker__date-selector">
            <IconButton onClick={() => this.datePicker.openDialog()}>
              <ArrowIcon className="dashboard-events-calendar-date-picker__date-selector-icon" />
            </IconButton>
          </div>
          <DatePicker
            style={{ display: 'none' }}
            ref={(input) => { this.datePicker = input; }}
            hintText="Date"
            formatDate={this.formatDate}
            value={this.state.date}
            minDate={new Date()}
            maxDate={this.getThisWeekend()}
            onChange={this.handleChangeDatePicker}
          />
        </Paper>
        <Paper className="dashboard-events-calendar-table__container">
          {
            isLoading ? <CircularProgress className="dashboard-calendar__progress" /> : (
              <div className="dashboard-calendar__content-container">
                { this.renderEvents(events) }
              </div>
            )
          }
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.user.details.id,
  isLoading: state.events.byDate.isLoading,
  events: state.events.byDate.details.error ? [] : state.events.byDate.details,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getUpcomingEventsByDate,
  }, dispatch),
});

DashboardCalendar.propTypes = propTypes;
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DashboardCalendar));
