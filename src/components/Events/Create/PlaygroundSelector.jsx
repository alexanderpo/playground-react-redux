import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paper, Subheader } from 'material-ui';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import PromoEventPhoto from '../../../styles/images/no-event-pictures.svg';

const propTypes = {
  playgrounds: PropTypes.array,
  updateSelectedPlayground: PropTypes.func,
};

const SelectableList = makeSelectable(List);

class PlaygroundSelector extends Component {
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
    const { playgrounds } = this.props;
    const { selectedPlayground } = this.state;
    return (
      <Paper zDepth={2} className="create-playground-user-details-wrapper">
        <SelectableList value={selectedPlayground}>
          <Subheader>SELECT PLAYGROUND</Subheader>
          { this.renderListItems(playgrounds)}
        </SelectableList>
      </Paper>
    );
  }
}

PlaygroundSelector.propTypes = propTypes;
export default PlaygroundSelector;
