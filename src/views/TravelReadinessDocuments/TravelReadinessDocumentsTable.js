import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import withLoading from '../../components/Hoc/withLoading';
import './TravelReadinessDocuments.scss';

export const UserReadiness = ({name, userId, department, passportsCount, visasCount}) => (
  <tr className="table__rows">
    <td className="mdl-data-table__cell--non-numeric table__data readiness__cell-name">
      <Link className="table__data--link" to={`/travel-readiness/${userId}`}>{name}</Link>
    </td>
    <td className="mdl-data-table__cell--non-numeric table__data">{department}</td>
    <td className="mdl-data-table__cell--non-numeric table__data">{passportsCount}</td>
    <td className="mdl-data-table__cell--non-numeric table__data">{visasCount}</td>
  </tr>
);

export const TableHead = () => (
  <thead>
    <tr>
      <th className="mdl-data-table__cell--non-numeric table__head">Name</th>
      <th className="mdl-data-table__cell--non-numeric table__head">Department</th>
      <th className="mdl-data-table__cell--non-numeric table__head">No. of Passports</th>
      <th className="mdl-data-table__cell--non-numeric table__head">No. of Visas</th>
    </tr>
  </thead>
);

export const TableBody = ({ users }) => (
  <tbody className="table__body">
    {
      users.map(user => {
        const visasCount = user.travelDocuments.filter(document => document.type === 'visa').length;
        const passportsCount = user.travelDocuments.filter(document => document.type === 'passport').length;
        return (
          <UserReadiness
            key={user.userId}
            name={user.fullName}
            userId={user.userId}
            department={user.department}
            visasCount={visasCount}
            passportsCount={passportsCount}
          />
        );
      })
    }
  </tbody>
);

const ReadinessTable = ({ users }) => (
  <div className="table__container">
    <table className="mdl-data-table mdl-js-data-table readiness-table">
      <TableHead />
      <TableBody users={users} />
    </table>
  </div>
);

UserReadiness.propTypes = {
  name: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  department: PropTypes.string.isRequired,
  passportsCount: PropTypes.number.isRequired,
  visasCount: PropTypes.number.isRequired,
};

ReadinessTable.propTypes = {
  users: PropTypes.array.isRequired,
};

TableBody.propTypes = {
  users: PropTypes.array.isRequired,
};

export default withLoading(ReadinessTable);
