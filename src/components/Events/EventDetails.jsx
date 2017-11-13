import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import { RaisedButton } from 'material-ui';
import { Card, CardHeader, CardMedia, CardTitle, CardText, CardActions } from 'material-ui/Card';
import PromoEventPhoto from '../../styles/images/no-event-pictures.svg';
import UserProfilePhoto from '../../styles/images/user.png';

const propTypes = {
  event: PropTypes.object,
};

class EventDetails extends Component {
  render() {
    const { event } = this.props;
    return (
      <div>
        <Card zDepth={3} className="event-card-details-box">
          <CardHeader
            className="card-event-header"
            title={event.creator_name}
            subtitle={event.creator_phone}
            avatar={event.creator_image ? event.creator_image : UserProfilePhoto}
          />
          <CardMedia
            overlay={<CardTitle title={event.event_title} />}
          >
            {
              !_.isEmpty(event.playground_images) ? (
                // TODO: implement image carusel
                <img className="event-card-details-image" src={event.playground_images} alt="" />
              ) : (
                <img className="event-card-details-no-image" src={PromoEventPhoto} alt="" />
              )
            }
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
            <RaisedButton className="event-card-details-actions-button" label="Unsubscribe" disabled={true} />
            <RaisedButton className="event-card-details-actions-button" label="Subscribe" primary={true} />
          </CardActions>
        </Card>
      </div>
    );
  }
}

EventDetails.propTypes = propTypes;
export default EventDetails;
