import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Divider, IconButton } from 'material-ui';
import NotFavoriteIcon from 'material-ui/svg-icons/toggle/star-border';
import FavoritePlaygroundIcon from 'material-ui/svg-icons/toggle/star';
import SubscribeToEventIcon from 'material-ui/svg-icons/maps/directions-run';
import { Card, CardHeader, CardMedia, CardTitle, CardText, CardActions } from 'material-ui/Card';
import UserProfilePhoto from '../../styles/images/user.png';
import PromoEventPhoto from '../../styles/images/no-event-pictures.svg';

const propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string,
    datetime: PropTypes.string,
  }),
  playground: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    images: PropTypes.array,
    address: PropTypes.string,
    creator: PropTypes.string,
    lat: PropTypes.float,
    lng: PropTypes.float,
  }),
  creator: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
  }),
};

class Event extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFavoritePlayground: false,
      isSubscribeEvent: false,
    };
  }

  render() {
    const { isFavoritePlayground, isSubscribeEvent } = this.state;
    const { event, playground, creator } = this.props;
    return (
      <div>
        <Card zDepth={3} className="event-card-box">
          <CardHeader
            className="card-event-header"
            title={creator.name}
            subtitle={creator.phone}
            avatar={creator.image ? creator.image : UserProfilePhoto}
          />
          <Divider />
          <CardMedia>
            {
              !_.isEmpty(playground.images) ? (
                // TODO: implement image carusel
                <img className="card-event-picture" src={playground.images} alt="" />
              ) : (
                <img className="card-event-no-picture" src={PromoEventPhoto} alt="" />
              )
            }
          </CardMedia>
          <CardTitle className="card-event-title" title={event.title} />
          <CardText className="card-event-description-text">
            { playground.description }
          </CardText>
          <CardActions className="card-event-actions-box">
            <IconButton
              iconStyle={isSubscribeEvent ? { color: 'rgba(81, 115, 153, 1)' } : {}}
              onClick={() => { this.setState({ isSubscribeEvent: !isSubscribeEvent }); }}
            >
              <SubscribeToEventIcon />
            </IconButton>
            <IconButton
              iconStyle={isFavoritePlayground ? { color: 'rgba(239, 200, 75, 1)' } : {}}
              onClick={() => { this.setState({ isFavoritePlayground: !isFavoritePlayground }); }}
            >
              {
                isFavoritePlayground ? <FavoritePlaygroundIcon /> : <NotFavoriteIcon />
              }
            </IconButton>
          </CardActions>
          <Divider className="card-event-picture-text-divider" />
          <CardTitle subtitle={`Start: ${event.datetime}`} />
        </Card>
      </div>
    );
  }
}

Event.propTypes = propTypes;
export default Event;
