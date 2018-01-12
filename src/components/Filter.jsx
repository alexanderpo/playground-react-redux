import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { TextField } from 'material-ui';

const propTypes = {
  field: PropTypes.string,
  items: PropTypes.array,
  filteredResults: PropTypes.func,
};

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };

    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  handleFilterChange(event) {
    const { field, items, filteredResults } = this.props;
    const filteredItems = _.filter(
      items,
      item => item[field].includes(event.target.value),
    );
    this.setState({
      value: event.target.value,
    });
    filteredResults(filteredItems);
  }

  render() {
    const { value } = this.state;
    return (
      <div>
        <TextField
          value={value}
          fullWidth={true}
          hintText="Filter"
          onChange={this.handleFilterChange}
        />
      </div>
    );
  }
}

Filter.propTypes = propTypes;
export default Filter;

/*
 // parent callback function
filteredResults = (newItems) => {
  this.setState({
    displayedPlaygrounds: newItems,
  });
};
 // call example
<Filter
  field="name"
  items={playgrounds}
  filteredResults={newItems => this.filteredResults(newItems)}
/>
*/
