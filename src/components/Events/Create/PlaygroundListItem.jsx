import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';
import PromoEventPhoto from '../../../styles/images/no-event-pictures.svg';

const propTypes = {
  playground: PropTypes.object,
  updateSelectedPlayground: PropTypes.func,
};

class PlaygroundListItem extends Component {
  render() {
    const { playground } = this.props;

    return (
      <ListItem
        primaryText={playground.name}
        value={playground.id}
        onClick={() => {
          this.props.updateSelectedPlayground(playground.id);
        }}
        leftAvatar={
          (playground.images[0] !== null) ?
            <img
              alt=""
              className="create-event__pg-selector-image"
              src={`/api/v1/images/${playground.images[0]}`}
            /> : <img src={PromoEventPhoto} alt="" />
        }
        secondaryText={playground.description}
      />
    );
  }
}

PlaygroundListItem.propTypes = propTypes;
export default PlaygroundListItem;
