import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import withLoading from '../Hoc/withLoading';

const className = 'mdl-data-table__cell--non-numeric';
export const ReasonsTableHead = () => (
  <thead>
    <tr>
      <th className={`${className} table__head`}>Reason</th>
      <th className={`${className} table__head pl-sm-100d description-left`}><span /></th>
      <th className={`${className} table__head pl-sm-100d description-left`}>Created By</th>
      <th className={`${className} table__head pl-sm-100d description-left`}><span /></th>
      <th className={`${className} table__head`}>Created On</th>
      <th className={`${className} table__head`} />
    </tr>
  </thead>
);

export const ReasonsTableRow = ({title, createdOn, createdBy: {fullName}}) => {
  return(
    <tr className="table__rows">
      <td className={`${className} table__data readiness__cell-name`}>{_.capitalize(title)}</td>
      <td className={`${className} table__data`} />
      <td className={`${className} table__data`}>{fullName}</td>
      <td className={`${className} table__data`} />
      <td className={`${className} table__data`}>
        {moment(new Date(createdOn)).format('DD-MM-YYYY')}
      </td>
      <td className={`${className} table__data`}>
        <i
          className="fa fa-ellipsis-v on"
          id="toggleIcon"
          role="presentation"
        />
      </td>
    </tr>
  );
};

export const ReasonsTableBody = ({reasons}) => {
  return (
    <tbody className="table__body">
      {
        reasons.map(reason => {
          return(
            <ReasonsTableRow
              key={reason.id}
              title={reason.title}
              createdOn={reason.createdAt}
              createdBy={reason.creator}
            />
          );
        })
      }
    </tbody>
  );
};
export const TravelReasonsTable = ({ reasons }) => (
  <div className="list-reasons">
    <div className="table__container">
      <table className="mdl-data-table mdl-js-data-table readiness-table">
        <ReasonsTableHead />
        <ReasonsTableBody
          reasons={reasons}
        />
      </table>
    </div>
  </div>
);

TravelReasonsTable.propTypes = {
  reasons: PropTypes.array.isRequired,
};

ReasonsTableBody.propTypes = {
  reasons: PropTypes.array.isRequired,
};

ReasonsTableRow.propTypes = {
  title: PropTypes.string.isRequired,
  createdOn: PropTypes.string.isRequired,
  createdBy: PropTypes.object.isRequired
};

export default withLoading(TravelReasonsTable);
