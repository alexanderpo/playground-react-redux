import React, { Component } from 'react';
import { Divider, FlatButton } from 'material-ui';
import ListIcon from 'material-ui/svg-icons/action/view-list';
import GridIcon from 'material-ui/svg-icons/action/view-module';

class EventsFilter extends Component {
  render() {
    return (
      <div className="event-filter-box">
        <div className="event-filter-buttons">
          <FlatButton
            icon={<ListIcon />}
            primary={true}
          />
          <FlatButton
            icon={<GridIcon />}
            primary={true}
          />
        </div>
        <Divider className="event-filter-divider" />
      </div>
    );
  }
}

export default EventsFilter;
