import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import moment from 'moment';
import { Paper, DatePicker, IconButton } from 'material-ui';
import ArrowIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import CalendarEvent from '../../components/Playgrounds/PlaygroundCalendarEvent';
import { getEventsOnPlaygroundByDate } from '../../actions/playgrounds';
import { subscribeEventControl, updateNotificationStatus } from '../../actions/user';

const propTypes = {
  match: PropTypes.object,
  userId: PropTypes.number,
  events: PropTypes.array,
  actions: PropTypes.shape({
    getEventsOnPlaygroundByDate: PropTypes.func,
    updateNotificationStatus: PropTypes.func,
    subscribeEventControl: PropTypes.func,
  }),
};

class EventsCalendar extends Component {
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
    const { actions } = this.props;
    const { playgroundId } = this.props.match.params;
    const filteredDate = moment(this.state.date).format('YYYY-MM-DD');
    actions.getEventsOnPlaygroundByDate(playgroundId, filteredDate);
  };


  handleChangeDatePicker = (event, date) => {
    const { actions } = this.props;
    const { playgroundId } = this.props.match.params;
    this.setState({ date });
    const filteredDate = moment(date).format('YYYY-MM-DD');
    actions.getEventsOnPlaygroundByDate(playgroundId, filteredDate);
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
        updateNotificationStatus={this.props.actions.updateNotificationStatus}
      />
    )) : (
      <Paper className="calendar-pg__empty-text">Don&apos;t have event&apos;s on this date</Paper>
    )
  );

  render() {
    const { events } = this.props;
    return (
      <div className="dashboard-events-calendar__wrapper">
        <div className="dashboard-events-calendar_date-picker-title__container">
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
          <div className="pg-info__label">events schedule</div>
        </div>
        <div className="dashboard-events-calendar-table__container">
          <div className="dashboard-calendar__content-container">
            { this.renderEvents(events) }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const userId = state.user.details.id;
  const { isLoading } = state.playgrounds.eventsByDate;
  const { subscribedEvents } = state.user.details;

  const events = state.playgrounds.eventsByDate.details.error ? [] :
    state.playgrounds.eventsByDate.details.map(event => ({
      ...event,
      isSubscribed: _.includes(subscribedEvents, event.event_id),
    }));

  return {
    userId,
    isLoading,
    events,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getEventsOnPlaygroundByDate,
    updateNotificationStatus,
    subscribeEventControl,
  }, dispatch),
});

EventsCalendar.propTypes = propTypes;
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EventsCalendar));
