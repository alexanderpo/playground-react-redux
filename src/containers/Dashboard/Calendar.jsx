import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { Paper, DatePicker, IconButton, CircularProgress } from 'material-ui';
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import MoreContentIcon from 'material-ui/svg-icons/navigation/more-horiz';
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

  renderEvents = events => (
    !_.isEmpty(events) ? events.map(event => (
      <TableRow key={event.event_id} className="dashboard-events-calendar_table__row">
        <TableRowColumn className="dashboard-events-calendar_table-row__column calendar_table-row__time">
          { moment(event.event_datetime).format('H:MM') }
        </TableRowColumn>
        <TableRowColumn className="dashboard-events-calendar_table-row__column calendar-table-row-column__title">
          <span>
            <span className="calendar_table-row__title">
              {event.event_title}
            </span> at <span className="calendar_table-row__title">{event.playground_name}</span>
          </span>
        </TableRowColumn>
        <TableRowColumn className="dashboard-events-calendar_table-row__column calendar-table-row__actions">
          <IconButton>
            <MoreContentIcon className="dashboard-events-calendar-table__more-content-icon" />
          </IconButton>
        </TableRowColumn>
      </TableRow>
    )) : (
      <TableRow className="dashboard-events-calendar_table__row dashboard-events-calendar__empty">
        <TableRowColumn>Don&apos;t have event&apos;s on this date</TableRowColumn>
      </TableRow>
    )
  );
  // TODO: implement more info with unsubscribe action
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
            isLoading ? <CircularProgress /> : (
              <Table selectable={false}>
                <TableBody displayRowCheckbox={false}>
                  { this.renderEvents(events) }
                </TableBody>
              </Table>
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
  events: state.events.byDate.details,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getUpcomingEventsByDate,
  }, dispatch),
});

DashboardCalendar.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(DashboardCalendar);
