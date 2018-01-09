import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import moment from 'moment';
import classNames from 'classnames';
import { IconButton, Divider } from 'material-ui';
import MoreContentIcon from 'material-ui/svg-icons/navigation/more-horiz';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

const propTypes = {
  userId: PropTypes.number,
  event: PropTypes.object,
  unsubscribe: PropTypes.func,
  update: PropTypes.func,
};

class CalendarEvent extends Component {
  state = {
    moreInfoIsOpen: false,
  };

  render() {
    const {
      event,
      userId,
      unsubscribe,
      update,
    } = this.props;
    const { moreInfoIsOpen } = this.state;

    return (
      <div key={event.event_id} className="calendar-content__column">
        <div className="calendar-main-content">
          <div className="calendar__info">
            { moment(event.event_datetime).format('H:mm') }
          </div>
          <div className="calendar__info calendar__title">
            <Link
              to={`/events/${event.event_id}`}
              title={event.event_title}
              className="calendar-info__title"
            >
              {`${event.event_title} `}
            </Link>
            at
            <Link
              to={`/playgrounds/${event.playground_id}`}
              title={event.playground_name}
              className="calendar-info__title"
            >
              {` ${event.playground_name}`}
            </Link>
          </div>
          <div className="calendar__actions">
            <IconButton onClick={() => this.setState({ moreInfoIsOpen: !moreInfoIsOpen })}>
              <MoreContentIcon
                className={classNames({
                  'dashboard-calendar_more-icon__active': moreInfoIsOpen,
                  'dashboard-calendar_more-icon__disabled': !moreInfoIsOpen,
                })}
              />
            </IconButton>
          </div>
        </div>
        <div
          className={classNames('calendar-more-content', {
            'calendar-content__active': moreInfoIsOpen,
            'calendar-content__disabled': !moreInfoIsOpen,
          })}
        >
          <div>{event.playground_description}</div>
          <div className="calendar-more-content__stats">
            <span>Players - <span className="bolder__text">{event.subscribed_users}</span></span>
            <span>Organiser - <span className="bolder__text">{event.creator_name}</span></span>
            <IconButton
              onClick={() => unsubscribe(userId, event.event_id).then(() => { update(); })}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
        <Divider />
      </div>
    );
  }
}

CalendarEvent.propTypes = propTypes;
export default withRouter(CalendarEvent);
