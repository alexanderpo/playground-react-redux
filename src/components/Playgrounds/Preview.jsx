import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Divider, IconButton } from 'material-ui';
// import NotFavoriteIcon from 'material-ui/svg-icons/toggle/star-border';
import FavoritePlaygroundIcon from 'material-ui/svg-icons/toggle/star';
import SubscribeToEventIcon from 'material-ui/svg-icons/maps/directions-run';
import EventDetailsIcon from 'material-ui/svg-icons/action/event';
import { Card, CardHeader, CardMedia, CardTitle, CardText, CardActions } from 'material-ui/Card';
import UserProfilePhoto from '../../styles/images/user.png';
import PromoEventPhoto from '../../styles/images/no-event-pictures.svg';

class PlaygroundPreview extends Component {
  render() {
    return (
      <div>
        <Card zDepth={3} className="event-card-box">
          <CardHeader
            className="card-event-header"
            title="creator name"
            subtitle="subtitle header"
            avatar={UserProfilePhoto}
          />
          <Divider />
          <CardMedia>
            <img className="card-event-no-picture" src={PromoEventPhoto} alt="" />
          </CardMedia>
          <CardTitle className="card-event-title" title="titleasdad" />
          <CardText className="card-event-description-text">
            asdadadasdasdadasdasdadaa
          </CardText>
          <CardActions className="card-event-actions-box">
            <IconButton>
              <EventDetailsIcon />
            </IconButton>
            <IconButton>
              <SubscribeToEventIcon />
            </IconButton>
            <IconButton>
              <FavoritePlaygroundIcon />
            </IconButton>
          </CardActions>
          <Divider className="card-event-picture-text-divider" />
          <CardTitle subtitle="subtitle" />
        </Card>
      </div>
    );
  }
}

export default withRouter(PlaygroundPreview);
