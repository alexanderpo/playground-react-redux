import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import { RaisedButton, Snackbar } from 'material-ui';
import { Card, CardHeader, CardMedia, CardTitle, CardText, CardActions } from 'material-ui/Card';
import ImageCarousel from '../ImageCarousel';
import UserProfilePhoto from '../../styles/images/user.png';

const propTypes = {
  userId: PropTypes.number,
  event: PropTypes.object,
  subscribeControl: PropTypes.func,
  updateSubscribers: PropTypes.func,
};

class EventDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogBoxIsOpen: false,
      dialogBoxText: '',
    };
    this.subscribeEventHandler = this.subscribeEventHandler.bind(this);
  }

  subscribeEventHandler() {
    const {
      userId,
      event,
      subscribeControl,
      updateSubscribers,
    } = this.props;
    subscribeControl(userId, event.event_id).then((action) => {
      const { subscribedEvents } = action.payload;
      const subscribe = _.includes(subscribedEvents, event.event_id);
      const subscribers = subscribe ?
        Number(event.subscribed_users) + 1 : Number(event.subscribed_users) - 1;
      updateSubscribers({ isSubscribe: subscribe, subscribed_users: subscribers });
      this.setState({
        dialogBoxIsOpen: true,
        dialogBoxText: subscribe ?
          `Subscribed! Event start ${moment(event.event_datetime).format('lll')}.` : 'Unsubscribed!',
      });
    });
  }

  render() {
    const { event } = this.props;
    const { dialogBoxIsOpen, dialogBoxText } = this.state;
    return (
      <div>
        <Card zDepth={3} className="event-card-details-box">
          <CardHeader
            className="card-event-header"
            title={event.creator_name}
            subtitle={event.creator_phone}
            avatar={(event.creator_image === null) ? UserProfilePhoto : `/api/v1/images/${event.creator_image}`}
          />
          <CardMedia
            overlay={<CardTitle title={event.event_title} />}
          >
            <ImageCarousel images={event.images} />
          </CardMedia>
          <CardTitle title={event.playground_name} className="event-card-details-playground-title" />
          <CardText className="event-card-details-description">
            {event.playground_description}
          </CardText>
          <div className="event-card-details-more-info-text">
            <CardTitle subtitle={`Start: ${moment(event.event_datetime).format('lll')}`} />
            <CardTitle subtitle={`Players: ${event.subscribed_users}`} />
          </div>
          <CardActions className="event-card-details-actions-box">
            <RaisedButton
              className="event-card-details-actions-button"
              label="Unsubscribe"
              disabled={!event.isSubscribe}
              primary={true}
              onClick={this.subscribeEventHandler}
            />
            <RaisedButton
              className="event-card-details-actions-button"
              label="Subscribe"
              disabled={event.isSubscribe}
              primary={true}
              onClick={this.subscribeEventHandler}
            />
          </CardActions>
        </Card>
        <Snackbar
          className="event-details-dialog-box"
          open={dialogBoxIsOpen}
          message={dialogBoxText}
          autoHideDuration={4000}
          onRequestClose={() => { this.setState({ dialogBoxIsOpen: false }); }}
        />
      </div>
    );
  }
}

EventDetails.propTypes = propTypes;
export default EventDetails;
