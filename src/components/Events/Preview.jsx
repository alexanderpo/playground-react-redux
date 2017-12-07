import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import { Divider, IconButton, Snackbar } from 'material-ui';
import NotFavoriteIcon from 'material-ui/svg-icons/toggle/star-border';
import FavoritePlaygroundIcon from 'material-ui/svg-icons/toggle/star';
import SubscribeToEventIcon from 'material-ui/svg-icons/maps/directions-run';
import EventDetailsIcon from 'material-ui/svg-icons/action/event';
import { Card, CardHeader, CardMedia, CardTitle, CardText, CardActions } from 'material-ui/Card';
import ImageCarousel from '../ImageCarousel';
import UserProfilePhoto from '../../styles/images/user.png';

const propTypes = {
  userId: PropTypes.number,
  subscribeEventControl: PropTypes.func,
  favoritePlaygroundControl: PropTypes.func,
  isSubscribed: PropTypes.bool,
  isFavorite: PropTypes.bool,
  history: PropTypes.object,
  event: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    datetime: PropTypes.string,
  }),
  playground: PropTypes.shape({
    id: PropTypes.number,
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

class EventPreview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFavoritePlayground: this.props.isFavorite,
      isSubscribeEvent: this.props.isSubscribed,
      dialogBoxIsOpen: false,
      dialogBoxText: '',
    };

    this.subscribeEventHandler = this.subscribeEventHandler.bind(this);
    this.favoritePlaygroundHandler = this.favoritePlaygroundHandler.bind(this);
  }

  subscribeEventHandler() {
    const { userId, event, subscribeEventControl } = this.props;
    subscribeEventControl(userId, event.id).then((action) => {
      const { subscribedEvents } = action.payload;
      const subscribe = _.includes(subscribedEvents, event.id);
      this.setState({
        isSubscribeEvent: subscribe,
        dialogBoxIsOpen: true,
        dialogBoxText: subscribe ?
          `Subscribed! Event start ${event.datetime}.` : 'Unsubscribed!',
      });
    });
  }

  favoritePlaygroundHandler() {
    const { userId, playground, favoritePlaygroundControl } = this.props;

    favoritePlaygroundControl(userId, playground.id).then((action) => {
      const { favoritePlaygrounds } = action.payload;
      const favorite = _.includes(favoritePlaygrounds, playground.id);
      this.setState({
        isFavoritePlayground: favorite,
        dialogBoxIsOpen: true,
        dialogBoxText: favorite ?
          'Added to favorite playgrounds.' : 'Remove from favorite playgrounds.',
      });
    });
  }

  render() {
    const {
      isFavoritePlayground,
      isSubscribeEvent,
      dialogBoxIsOpen,
      dialogBoxText,
    } = this.state;
    const {
      event,
      playground,
      creator,
    } = this.props;
    return (
      <div>
        <Card zDepth={3} className="event-card-box">
          <CardHeader
            className="card-event-header"
            title={creator.name}
            subtitle={creator.phone}
            avatar={(creator.image !== null) ? `/api/v1/images/${creator.image}` : UserProfilePhoto}
          />
          <Divider />
          <CardMedia>
            <ImageCarousel images={playground.images} />
          </CardMedia>
          <CardTitle className="card-event-title" title={event.title} />
          <CardText className="card-event-description-text">
            { playground.description }
          </CardText>
          <CardActions className="card-event-actions-box">
            <IconButton
              onClick={() => { this.props.history.push(`/events/${event.id}`); }}
            >
              <EventDetailsIcon />
            </IconButton>
            <IconButton
              iconStyle={isSubscribeEvent ? { color: 'rgba(81, 115, 153, 1)' } : {}}
              onClick={this.subscribeEventHandler}
            >
              <SubscribeToEventIcon />
            </IconButton>
            <IconButton
              iconStyle={isFavoritePlayground ? { color: 'rgba(239, 200, 75, 1)' } : {}}
              onClick={this.favoritePlaygroundHandler}
            >
              {
                isFavoritePlayground ? <FavoritePlaygroundIcon /> : <NotFavoriteIcon />
              }
            </IconButton>
          </CardActions>
          <Divider className="card-event-picture-text-divider" />
          <CardTitle subtitle={`Start: ${event.datetime}`} />
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

EventPreview.propTypes = propTypes;
export default withRouter(EventPreview);
