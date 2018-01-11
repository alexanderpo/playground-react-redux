import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import moment from 'moment';
import { IconButton, Divider, Paper } from 'material-ui';
import CheckedIcon from 'material-ui/svg-icons/action/check-circle';
import UnCheckedIcon from 'material-ui/svg-icons/toggle/radio-button-unchecked';

const propTypes = {
  userId: PropTypes.number,
  event: PropTypes.object,
  unsubscribe: PropTypes.func,
  update: PropTypes.func,
  updateNotificationStatus: PropTypes.func,
};

class PlaygroundCalendarEvent extends Component {
  render() {
    const {
      event,
      userId,
      unsubscribe,
      update,
      updateNotificationStatus,
    } = this.props;

    return (
      <Paper key={event.event_id} className="calendar-content__column calendar-content__pg">
        <div className="calendar-main-content calendar-main-content__content-pg">
          <div className="calendar__info">
            { moment(event.event_datetime).format('H:mm') }
          </div>
          <div className="calendar__info calendar__title">
            <Link
              to={`/events/${event.event_id}`}
              title={event.event_title}
              className="calendar-info__pg-title"
            >
              {`${event.event_title} `}
            </Link>
          </div>
          <div className="calendar__actions">
            <IconButton
              onClick={
                () => {
                  unsubscribe(userId, event.event_id).then(() => {
                    updateNotificationStatus({
                      show: true,
                      message: !event.isSubscribed ?
                      `Subscribed to ${event.event_title}` :
                      `Unsubscribed from ${event.event_title}`,
                      type: 'success',
                    });
                    update();
                  });
                }
              }
              tooltip={event.isSubscribed ? 'Unsubscribe' : 'Subscribe'}
              tooltipPosition="top-center"
            >
              {
                event.isSubscribed ? <CheckedIcon className="profile-edit-button__icon" /> :
                <UnCheckedIcon className="" />
              }
            </IconButton>
          </div>
        </div>
        <Divider />
      </Paper>
    );
  }
}

PlaygroundCalendarEvent.propTypes = propTypes;
export default withRouter(PlaygroundCalendarEvent);

/*
<Divider />
<div className="calendar-more-content">
  <div>{event.playground_description}</div>
  <div className="calendar-more-content__stats calendar-more-content__calendar-pg">
    <span>Players - <span className="bolder__text">{event.subscribed_users}</span></span>
    <span>Organiser - <span className="bolder__text">{event.creator_name}</span></span>
  </div>
</div>
*/
