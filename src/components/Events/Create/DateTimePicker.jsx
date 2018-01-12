import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { DatePicker, TimePicker } from 'material-ui';

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
      <div>
        <DatePicker
          className="create-event__input"
          hintText="EVENT DATETIME"
          floatingLabelText="DATETIME"
          floatingLabelFixed={true}
          value={datetime}
          errorText={this.props.errorText}
          formatDate={this.formatDate}
          minDate={new Date()}
          onChange={this.handleChangeDatePicker}
          textFieldStyle={{ fontSize: '14px' }}
        />
        <TimePicker
          className="create-event__input"
          format="24hr"
          hintText="timepicker"
          style={{ display: 'none' }}
          ref={(input) => { this.timePicker = input; }}
          onChange={this.handleChangeTimePicker}
        />
      </div>
    );
  }
}

DateTimePicker.propTypes = propTypes;
export default DateTimePicker;
