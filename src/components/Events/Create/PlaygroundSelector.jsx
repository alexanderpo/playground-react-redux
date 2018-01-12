import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import PromoEventPhoto from '../../../styles/images/no-event-pictures.svg';
// import PlaygroundListItem from './PlaygroundListItem';
import Filter from '../../Filter';

const propTypes = {
  playgrounds: PropTypes.array,
  selectedPlayground: PropTypes.number,
  updateSelectedPlayground: PropTypes.func,
};

const SelectableList = makeSelectable(List);

class PlaygroundSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPlayground: 0,
      displayedPlaygrounds: this.props.playgrounds,
    };
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      selectedPlayground: nextProps.selectedPlayground,
      displayedPlaygrounds: (nextProps.playgrounds.length === this.props.playgrounds.length) ?
        this.state.displayedPlaygrounds : nextProps.playgrounds,
    });
  };

  filteredResults = (newItems) => {
    this.setState({
      displayedPlaygrounds: newItems,
    });
  };

  renderListItems = playgrounds => (
    _.isEmpty(playgrounds) ? <div>Not found</div> :
      playgrounds.map(playground => (
        <ListItem
          key={playground.id}
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
      ))
  );

  render() {
    const { playgrounds } = this.props;
    const { selectedPlayground, displayedPlaygrounds } = this.state;

    return (
      <div className="create-event__pg-selector-content">
        <div className="create-event__category-title">select playground</div>
        <div className="create-event__pg-selector-search">
          <Filter
            field="name"
            items={playgrounds}
            filteredResults={newItems => this.filteredResults(newItems)}
          />
        </div>
        <SelectableList className="create-event__selectable-list" value={selectedPlayground}>
          { this.renderListItems(displayedPlaygrounds)}
        </SelectableList>
      </div>
    );
  }
}

PlaygroundSelector.propTypes = propTypes;
export default PlaygroundSelector;
