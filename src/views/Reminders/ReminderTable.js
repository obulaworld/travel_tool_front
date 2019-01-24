import React from 'react';
import moment from 'moment';
import { PropTypes } from 'prop-types';
import './Reminder.scss';
import withLoading from '../../components/Hoc/withLoading';

const className = 'mdl-data-table__cell--non-numeric table__data';
const headClassName = 'table__head mdl-data-table__cell--non-numeric';

export const ReminderDetails = ({ conditionName, documentType, user, createdAt }) => (

  <tr className="table__rows">
    <td className={`${className} condition-name`}>{conditionName}</td>
    <td className={className}>{documentType}</td>
    <td className={className}>{user.fullName}</td>
    <td className={className}>{moment(new Date(createdAt)).format('DD-MM-YYYY')}</td>
    <td className={className}>
      <i
        className="fa fa-ellipsis-v on"
        id="toggleIcon"
        role="presentation"
      />
    </td>
  </tr>
);


const reminderTable = ({reminders}) => (
  <div className="table__container">
    <table className="mdl-data-table mdl-js-data-table readiness-table">
      <thead>
        <tr>
          <th className={headClassName}>Condition Name</th>
          <th className={headClassName}>Document Type</th>
          <th className={headClassName}>Created By</th>
          <th className={headClassName}>Created on</th>
          <th className={headClassName} />
        </tr>
      </thead>
      <tbody className="table__body">
        {
          reminders.map(reminder => <ReminderDetails key={reminder.id} {...reminder} />)
        }
      </tbody>
    </table>
  </div>
);

ReminderDetails.propTypes = {
  conditionName: PropTypes.string.isRequired,
  documentType: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  createdAt: PropTypes.string.isRequired
};

reminderTable.propTypes = {
  reminders: PropTypes.array.isRequired
};



export default withLoading(reminderTable);



