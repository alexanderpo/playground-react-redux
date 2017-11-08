import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Card, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
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
  render() {
    const { event, playground, creator } = this.props;
    return (
      <div>
        <Card zDepth={2} className="event-card-box">
          <CardHeader
            className="card-event-header"
            title={creator.name}
            subtitle={creator.phone}
            avatar={creator.image ? creator.image : UserProfilePhoto}
          />
          <CardMedia overlay={<CardTitle title={event.title} />}>
            {
              !_.isEmpty(playground.images) ? (
                // TODO: implement image carusel
                <img src={playground.images} alt="" />
              ) : (
                <img className="event-no-picture" src={PromoEventPhoto} alt="" />
              )
            }
          </CardMedia>
          <CardText>
            { playground.description }
          </CardText>
          <CardTitle subtitle={`Event start at ${event.datetime}`} />
        </Card>
      </div>
    );
  }
}

Event.propTypes = propTypes;
export default Event;
