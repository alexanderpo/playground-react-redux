import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { CircularProgress, IconButton, Snackbar } from 'material-ui';
import RemoveFavoriteIcon from 'material-ui/svg-icons/content/clear';

const propTypes = {
  match: PropTypes.object,
  value: PropTypes.string,
  isLoading: PropTypes.bool,
  content: PropTypes.array,
  actions: PropTypes.object,
};

class DashboardTable extends Component {
  state = {
    dialogBoxIsOpen: false,
    dialogBoxText: '',
  };

  removeFavoritePlayground = (playground) => {
    const { remove, update } = this.props.actions;
    const { userId } = this.props.match.params;

    remove(userId, playground.id).then((action) => {
      if (!action.payload.error) {
        update(userId);
      }
    });
  };

  removeEvent = (event) => {
    const { remove, update } = this.props.actions;
    const { userId } = this.props.match.params;

    remove(event.id).then((action) => {
      if (!action.payload.error) {
        update(userId);
      }
    });
  };

  removePlayground = (playground) => {
    const { remove, update } = this.props.actions;
    const { userId } = this.props.match.params;

    remove(playground.id).then((action) => {
      if (!action.payload.error) {
        update(userId);
      } else {
        this.setState({
          dialogBoxIsOpen: true,
          dialogBoxText: action.payload.error,
        });
      }
    });
  };

  removeItem = (item) => {
    const { value } = this.props;
    switch (value) {
      case 'favorite':
        return this.removeFavoritePlayground(item);
      case 'events':
        return this.removeEvent(item);
      case 'playgrounds':
        return this.removePlayground(item);
      default:
        return false;
    }
  };

  renderTableRowColumn = content => (
    content !== undefined ? content.map(item => (
      <TableRow key={item.id} className="dashboard-table__row">
        <TableRowColumn className="row-column__title">{item.title}</TableRowColumn>
        <TableRowColumn className="row-column__description">{item.description}</TableRowColumn>
        <TableRowColumn className="row-column__actions">
          <IconButton onClick={() => this.removeItem(item)}>
            <RemoveFavoriteIcon />
          </IconButton>
        </TableRowColumn>
      </TableRow>
    )) : null
  );

  render() {
    const { isLoading, content } = this.props;
    const { dialogBoxIsOpen, dialogBoxText } = this.state;
    return (
      <div className="dashboard-table__wrapper">
        {
          isLoading ? <CircularProgress className="dashboard-table__progress" /> : (
            <Table selectable={false}>
              <TableBody displayRowCheckbox={false}>
                { this.renderTableRowColumn(content) }
              </TableBody>
            </Table>
          )
        }
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

DashboardTable.propTypes = propTypes;
export default withRouter(DashboardTable);
