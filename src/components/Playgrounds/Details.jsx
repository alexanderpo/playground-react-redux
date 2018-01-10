import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { IconButton } from 'material-ui';
import NotFavoritePlaygroundIcon from 'material-ui/svg-icons/toggle/star-border';
import FavoritePlaygroundIcon from 'material-ui/svg-icons/toggle/star';
import ImageCarousel from '../ImageCarousel';

const propTypes = {
  userId: PropTypes.number,
  playground: PropTypes.object,
  favoriteControl: PropTypes.func,
  updateNotificationStatus: PropTypes.func,
};

class PlaygroundDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorite: this.props.playground.isFavorite,
    };

    this.favoritePlaygroundHandler = this.favoritePlaygroundHandler.bind(this);
  }

  favoritePlaygroundHandler() {
    const {
      userId,
      playground,
      favoriteControl,
      updateNotificationStatus,
    } = this.props;

    favoriteControl(userId, playground.id).then((action) => {
      const { favoritePlaygrounds } = action.payload;
      const favorite = _.includes(favoritePlaygrounds, playground.id);
      this.setState({
        isFavorite: favorite,
      });
      updateNotificationStatus({
        show: true,
        message: favorite ?
          'Added to favorite playgrounds.' : 'Remove from favorite playgrounds.',
        type: 'success',
      });
    });
  }

  render() {
    const { playground } = this.props;
    const { isFavorite } = this.state;
    return (
      <div className="pg-info__content">
        <div className="pg-info__image-carousel">
          <ImageCarousel images={playground.images} />
          <IconButton
            iconStyle={isFavorite ? { color: 'rgba(239, 200, 75, 1)' } : {}}
            onClick={this.favoritePlaygroundHandler}
            className="pg-info__favorite-btn"
          >
            {
              isFavorite ? <FavoritePlaygroundIcon /> : <NotFavoritePlaygroundIcon />
            }
          </IconButton>
        </div>
        <div className="pg-info__description">
          <div className="pg-info__address">
            <span className="pg-info__label">address</span>
            <span className="pg-info__text">{playground.address}</span>
          </div>
          <div className="pg-info__about">
            <span className="pg-info__label">about place</span>
            <div className="pg-info__about-text">{playground.description}</div>
          </div>
          <div className="pg-info__creator">
            <span className="pg-info__label">created by</span>
            <span className="pg-info__creator-text">{playground.creator}</span>
          </div>
        </div>
      </div>
    );
  }
}

PlaygroundDetails.propTypes = propTypes;
export default PlaygroundDetails;
