import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Divider, FlatButton } from 'material-ui';
import classNames from 'classnames';
import ListIcon from 'material-ui/svg-icons/action/view-list';
import GridIcon from 'material-ui/svg-icons/action/view-module';

const propTypes = {
  children: PropTypes.array,
};

class EventsFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isList: true,
      isGrid: false,
    };
  }

  render() {
    const { isList, isGrid } = this.state;
    return (
      <div className="filter-container">
        <div className="filter-box">
          <div className="filter-buttons">
            <FlatButton
              icon={<ListIcon />}
              primary={true}
              style={isList ? { backgroundColor: 'rgba(153,153,153,0.2)' } : {}}
              onClick={() => { this.setState({ isList: true, isGrid: false }); }}
            />
            <FlatButton
              icon={<GridIcon />}
              primary={true}
              style={isGrid ? { backgroundColor: 'rgba(153,153,153,0.2)' } : {}}
              onClick={() => { this.setState({ isList: false, isGrid: true }); }}
            />
          </div>
          <Divider className="filter-divider" />
        </div>
        <div className={classNames({ 'filtered-list-content': isList, 'filtered-grid-content': isGrid })}>
          { this.props.children }
        </div>
      </div>
    );
  }
}

EventsFilter.propTypes = propTypes;
export default EventsFilter;
