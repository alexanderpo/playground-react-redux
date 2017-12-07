import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paper } from 'material-ui';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import PromoEventPhoto from '../../styles/images/no-event-pictures.svg';

const propTypes = {
  playgrounds: PropTypes.array,
};

const SelectableList = makeSelectable(List);

class PlaygroundsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPlayground: 0,
    };
  }

  renderListItems = playgrounds => (
    playgrounds.map(playground => (
      <ListItem
        key={playground.id}
        primaryText={playground.name}
        value={playground.id}
        onClick={() => { this.setState({ selectedPlayground: playground.id }); }}
        leftAvatar={
          (playground.images[0] !== null) ?
            <img className="playground-preview-image" src={`/api/v1/images/${playground.images[0]}`} alt="" /> :
            <img src={PromoEventPhoto} alt="" />
        }
        secondaryText={playground.description}
      />
    ))
  );

  render() {
    return (
      <div>
        <Paper zDepth={2}>
          <SelectableList value={this.state.selectedPlayground}>
            { this.renderListItems(this.props.playgrounds)}
          </SelectableList>
        </Paper>
      </div>
    );
  }
}

PlaygroundsList.propTypes = propTypes;
export default PlaygroundsList;
