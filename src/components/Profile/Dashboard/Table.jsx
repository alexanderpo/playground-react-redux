import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { CircularProgress } from 'material-ui';

const propTypes = {
  isLoading: PropTypes.bool,
  content: PropTypes.array,
};

class DashboardTable extends Component {
  renderTableRowColumn = content => (
    content !== undefined ? content.map(item => (
      <TableRow key={item.id}>
        <TableRowColumn>{item.title}</TableRowColumn>
        <TableRowColumn>{item.description}</TableRowColumn>
        <TableRowColumn>action</TableRowColumn>
      </TableRow>
    )) : null
  );

  render() {
    const { isLoading, content } = this.props;
    return (
      <div>
        {
          isLoading ? <CircularProgress /> : (
            <Table selectable={false}>
              <TableBody displayRowCheckbox={false}>
                { this.renderTableRowColumn(content) }
              </TableBody>
            </Table>
          )
        }
      </div>
    );
  }
}

DashboardTable.propTypes = propTypes;
export default DashboardTable;
