import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import { Divider, IconButton, Snackbar } from 'material-ui';
import NotFavoritePlaygroundIcon from 'material-ui/svg-icons/toggle/star-border';
import FavoritePlaygroundIcon from 'material-ui/svg-icons/toggle/star';
import PlaygroundDetailsIcon from 'material-ui/svg-icons/maps/layers';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'material-ui/Card';
import PromoEventPhoto from '../../styles/images/no-event-pictures.svg';

const propTypes = {
  userId: PropTypes.number,
  favoritePlaygroundControl: PropTypes.func,
  playground: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    images: PropTypes.array,
    isFavorite: PropTypes.bool,
    address: PropTypes.string,
    created: PropTypes.string,
    creator: PropTypes.string,
    lat: PropTypes.float,
    lng: PropTypes.float,
  }),
};

class PlaygroundPreview extends Component {
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
    const { userId, playground, favoritePlaygroundControl } = this.props;

    favoritePlaygroundControl(userId, playground.id).then((action) => {
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

  render() {
    const { playground } = this.props;
    const { isFavorite, dialogBoxIsOpen, dialogBoxText } = this.state;
    return (
      <div>
        <Card zDepth={3} className="playground-card-box">
          <CardMedia overlay={<CardTitle title={playground.name} />}>
            {
              !_.isEmpty(playground.images) ? (
                <img className="playground-card-picture" src={playground.images} alt="" />
              ) : (
                <img className="playground-card-no-picture" src={PromoEventPhoto} alt="" />
              )
            }
          </CardMedia>
          <CardText className="playground-card-description-text">
            { playground.description }
          </CardText>
          <CardTitle subtitle={playground.address} />
          <CardActions className="playground-card-actions-box">
            <IconButton>
              <PlaygroundDetailsIcon />
            </IconButton>
            <IconButton
              iconStyle={isFavorite ? { color: 'rgba(239, 200, 75, 1)' } : {}}
              onClick={this.favoritePlaygroundHandler}
            >
              {
                isFavorite ? <FavoritePlaygroundIcon /> : <NotFavoritePlaygroundIcon />
              }
            </IconButton>
          </CardActions>
          <Divider className="playground-card-picture-text-divider" />
          <CardTitle subtitle={`${playground.created} by ${playground.creator}`} />
        </Card>
        <Snackbar
          className="playground-preview-dialog-box"
          open={dialogBoxIsOpen}
          message={dialogBoxText}
          autoHideDuration={4000}
          onRequestClose={() => { this.setState({ dialogBoxIsOpen: false }); }}
        />
      </div>
    );
  }
}

PlaygroundPreview.propTypes = propTypes;
export default withRouter(PlaygroundPreview);
