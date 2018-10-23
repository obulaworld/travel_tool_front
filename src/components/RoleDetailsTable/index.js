import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import withLoading from '../Hoc/withLoading';
import './RoleDetailsTable.scss';

const testColor = {
  color: 'blue',
};
export class RoleDetailsTable extends PureComponent {
  renderRoleUser(roleUser) {
    const { handleEditCenter } = this.props;
    return (
      <tr key={roleUser.id} className="table__rows">
        <td className="mdl-data-table__cell--non-numeric role-user__name table__data freeze-role-table">
          {roleUser.fullName}
        </td>
        <td className="mdl-data-table__cell--non-numeric table__data pl-sm-120">
          {roleUser.centers[0].location}
        </td>
        <td
          className="mdl-data-table__cell--non-numeric table__requests__status table__data delete"
          style={testColor}
        >
          <span onClick={()=>  handleEditCenter(roleUser)} id="editButton" role="presentation" onKeyDown={this.key}>Edit</span>
           &ensp; &ensp;  &ensp;  &ensp; &ensp;  Delete
        </td>
      </tr>
    );
  }

  renderNoUsers(roleName) {
    return (
      <div className="table__requests--empty">
        {`No ${roleName.toLowerCase()} at the moment`}
      </div>);
  }

  renderError(error) {
    return <div className="table__requests--error">{error}</div>;
  }

  renderTableHead() {
    return (
      <tr>
        <th className="mdl-data-table__cell--non-numeric bb-md-0 table__head freeze freeze-head ">
          Name
        </th>
        <th className="mdl-data-table__cell--non-numeric table__head pl-sm-100d description-left">
          Center
        </th>
        <th className="mdl-data-table__cell--non-numeric table__head table__head--last">
          Actions
        </th>
      </tr>
    );
  }

  render() {
    const { travelTeamMembers, error, roleName } = this.props;
    return (
      <Fragment>
        <div className="table__container">
          {error && this.renderError(error)}
          {travelTeamMembers &&
            travelTeamMembers.length > 0 ? (
              <table className="mdl-data-table mdl-js-data-table table__requests">
                <thead>
                  {this.renderTableHead()}
                </thead>
                <tbody className="table__body">
                  {travelTeamMembers.map(user => this.renderRoleUser(user))}
                </tbody>
              </table>
            ) : null}
          { !error && travelTeamMembers.length === 0
            && this.renderNoUsers(roleName)}
        </div>
      </Fragment>
    );
  }
}

RoleDetailsTable.propTypes = {
  travelTeamMembers: PropTypes.array,
  handleEditCenter: PropTypes.func,
  error: PropTypes.string,
  roleName: PropTypes.string,
};

RoleDetailsTable.defaultProps = {
  travelTeamMembers: [],
  error: '',
  roleName: '',
  handleEditCenter: ()=> {}
};

export default withLoading(RoleDetailsTable);
