import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import withLoading from '../Hoc/withLoading';

const testColor = {
  color: 'blue',
  marginRight: '80%'
};
export class RoleTable extends PureComponent {
  renderRoles(role) {
    return (
      <tr key={role.id} className="table__row">
        <td className="mdl-data-table__cell--non-numeric table__requests__destination table__data freeze">
          {role.roleName}
        </td>
        <td className="mdl-data-table__cell--non-numeric table__data">
          {role.description}
        </td>
        <td className="mdl-data-table__cell--non-numeric table__data">
          {role.users.length}
        </td>
        <td
          className="mdl-data-table__cell--non-numeric table__requests__status table__data"
          style={testColor}
        >
          Edit &ensp; &ensp;  &ensp;  &ensp; &ensp;  Delete
        </td>
      </tr>
    );
  }

  renderTableHead() {
    return (
      <tr>
        <th className="mdl-data-table__cell--non-numeric table__head freeze">
          Role Name
        </th>
        <th className="mdl-data-table__cell--non-numeric table__head">
          Description
        </th>
        <th className="mdl-data-table__cell--non-numeric table__head">
        Users
        </th>
        <th className="mdl-data-table__cell--non-numeric table__head">
          Actions
        </th>
      </tr>
    );
  }

  render() {
    const { role } = this.props;
    return (
      <Fragment>
        <div className="table__container">
          {role &&
            role.length > 0 && (
            <table className="mdl-data-table mdl-js-data-table table__requests">
              <thead>
                {this.renderTableHead()}
              </thead>
              <tbody className="table__body">
                {role.map(role => this.renderRoles(role))}
              </tbody>
            </table>
          )}
        </div>
      </Fragment>
    );
  }
}

RoleTable.propTypes = {
  role: PropTypes.array
};

RoleTable.defaultProps = {
  role: []
};

export default withLoading(RoleTable);
