import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import { IconButton, Snackbar } from 'material-ui';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'material-ui/Card';
import NotFavoritePlaygroundIcon from 'material-ui/svg-icons/toggle/star-border';
import FavoritePlaygroundIcon from 'material-ui/svg-icons/toggle/star';
import PromoEventPhoto from '../../styles/images/no-event-pictures.svg';

const propTypes = {
  userId: PropTypes.number,
  playground: PropTypes.object,
  favoriteControl: PropTypes.func,
};

class PlaygroundDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorite: this.props.playground.isFavorite,
      dialogBoxIsOpen: false,
      dialogBoxText: '',
    };

    this.favoritePlaygroundHandler = this.favoritePlaygroundHandler.bind(this);
  }

  favoritePlaygroundHandler() {
    const { userId, playground, favoriteControl } = this.props;

    favoriteControl(userId, playground.id).then((action) => {
      const { favoritePlaygrounds } = action.payload;
      const favorite = _.includes(favoritePlaygrounds, playground.id);
      this.setState({
        isFavorite: favorite,
        dialogBoxIsOpen: true,
        dialogBoxText: favorite ?
          'Added to favorite playgrounds.' : 'Remove from favorite playgrounds.',
      });
    });
  }

  renderImages = images => (
    !_.isEmpty(images) ? images.map(image => (
      <img key={image} src={`/api/v1/images/${image}`} alt="" />
    )) : (
      <img src={PromoEventPhoto} alt="" />
    )
  );

  render() {
    const { playground } = this.props;
    const { isFavorite, dialogBoxIsOpen, dialogBoxText } = this.state;
    return (
      <div>
        <Card zDepth={3}>
          <CardMedia
            overlay={<CardTitle title={playground.name} />}
          >
            {this.renderImages(playground.images)}
          </CardMedia>
          <CardText>
            {playground.description}
          </CardText>
          <CardTitle subtitle={playground.address} />
          <CardTitle subtitle={`${moment(playground.created_at).format('lll')} by ${playground.creator}`} />
          <CardActions>
            <IconButton
              iconStyle={isFavorite ? { color: 'rgba(239, 200, 75, 1)' } : {}}
              onClick={this.favoritePlaygroundHandler}
            >
              {
                isFavorite ? <FavoritePlaygroundIcon /> : <NotFavoritePlaygroundIcon />
              }
            </IconButton>
          </CardActions>
        </Card>
        <Snackbar
          open={dialogBoxIsOpen}
          message={dialogBoxText}
          autoHideDuration={4000}
          onRequestClose={() => { this.setState({ dialogBoxIsOpen: false }); }}
        />
      </div>
    );
  }
}

PlaygroundDetails.propTypes = propTypes;
export default PlaygroundDetails;
