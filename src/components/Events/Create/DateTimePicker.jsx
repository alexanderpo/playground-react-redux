import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Paper, DatePicker, TimePicker } from 'material-ui';

const propTypes = {
  updateDateTime: PropTypes.func,
  datetime: PropTypes.any,
  errorText: PropTypes.string,
};

class DateTimePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      datetime: null,
    };

    this.formatDate = this.formatDate.bind(this);
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      datetime: nextProps.datetime,
    });
  };

  handleChangeTimePicker = (event, time) => {
    const { date } = this.state;
    const newDateTime = this.createEventDateTime(date, time);
    this.props.updateDateTime(newDateTime);
    this.setState({ datetime: newDateTime });
  };

  handleChangeDatePicker = (event, date) => {
    this.timePicker.openDialog();
    this.setState({ date });
  };

  disablePrevDates = () => {
    const startSeconds = Date.parse(new Date());
    return (date) => { // eslint-disable-line
      return Date.parse(date) < startSeconds;
    };
  };

  formatDate() {
    return moment(new Date(this.state.datetime)).format('lll');
  }

  createEventDateTime = (date, time) => {
    const eventTimeFromDate = date.toString().split(' ')[4];
    const eventOriginalTime = time.toString().split(' ')[4];
    return new Date(date.toString().replace(eventTimeFromDate, eventOriginalTime));
  };

  render() {
    const { datetime } = this.state;
    return (
      <Paper zDepth={2} className="create-playground-user-details-wrapper">
        <DatePicker
          hintText="Choose event datetime"
          value={datetime}
          errorText={this.props.errorText}
          formatDate={this.formatDate}
          shouldDisableDate={this.disablePrevDates()}
          onChange={this.handleChangeDatePicker}
        />
        <TimePicker
          format="24hr"
          hintText="timepicker"
          style={{ display: 'none' }}
          ref={(input) => { this.timePicker = input; }}
          onChange={this.handleChangeTimePicker}
        />
      </Paper>
    );
  }
}

DateTimePicker.propTypes = propTypes;
export default DateTimePicker;
