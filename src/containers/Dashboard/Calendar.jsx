import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { Paper, DatePicker, IconButton, CircularProgress } from 'material-ui';
import ArrowIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import CalendarEvent from '../../components/Profile/Dashboard/CalendarEvent';
import { getUpcomingEventsByDate, subscribeEventControl } from '../../actions/user';
// import EventsSchedule from './EventsSchedule';

const propTypes = {
  title: PropTypes.string,
  userId: PropTypes.number,
  isLoading: PropTypes.bool,
  events: PropTypes.array,
  actions: PropTypes.shape({
    getUpcomingEventsByDate: PropTypes.func,
    subscribeEventControl: PropTypes.func,
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
    this.updateEventsByDate();
  };

  getThisWeekend = () => {
    const today = new Date();
    const nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
    return nextweek;
  }

  updateEventsByDate = () => {
    const { userId, actions } = this.props;
    const filteredDate = moment(this.state.date).format('YYYY-MM-DD');
    actions.getUpcomingEventsByDate(userId, filteredDate);
  };


  handleChangeDatePicker = (event, date) => {
    const { userId, actions } = this.props;
    this.setState({ date });
    const filteredDate = moment(date).format('YYYY-MM-DD');
    actions.getUpcomingEventsByDate(userId, filteredDate);
  };

  formatDate() {
    return moment(new Date(this.state.date)).format('l');
  }

  renderEvents = events => (
    !_.isEmpty(events) ? events.map(event => (
      <CalendarEvent
        key={event.event_id}
        userId={this.props.userId}
        event={event}
        unsubscribe={this.props.actions.subscribeEventControl}
        update={this.updateEventsByDate}
      />
    )) : (
      <div className="calendar_empty__text">Don&apos;t have event&apos;s on this date</div>
    )
  );

  render() {
    const { isLoading, events, title } = this.props;
    return (
      <div className="dashboard-events-calendar__wrapper">
        <span className="dashboard-events-calendar__title">{title}</span>
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
    subscribeEventControl,
  }, dispatch),
});

DashboardCalendar.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(DashboardCalendar);
