import React, { Fragment } from 'react';
import moment from 'moment';
import { PropTypes } from 'prop-types';
import './Reminder.scss';
import withLoading from '../../components/Hoc/withLoading';
import TemplatesMenu from '../../components/ReminderSetup/TemplatesMenu';

const className = 'mdl-data-table__cell--non-numeric table__data';
const headClassName = 'table__head mdl-data-table__cell--non-numeric';

export const AlertIcon = (visible, reminder, setItemToDisable) => {
  return (
    <Fragment>
      {
        visible ? (
          <i
            className="tiny material-icons"
            onClick={(event) => {
              setItemToDisable(false,reminder, reminder.reasons[0].reason,event);
            }} role="presentation"
          >
            error
          </i>
        ) : ''
      }
    </Fragment>
  );
};

export const ReminderDetails = ({ 
  reminder, 
  conditionName, 
  documentType, 
  user,
  createdAt, 
  disabled, 
  setItemToDisable, 
  id,
}) => {
  return (
    <tr className={`table__rows ${disabled ? 'off' : ''}`}>
      <td className={`${className} ${disabled ? '' : 'readiness__cell-name'}`}>
        {conditionName}
        {AlertIcon(disabled, reminder, setItemToDisable)}
      </td>
      <td className={className}>{documentType}</td>
      <td className={className}>{user.fullName}</td>
      <td className={className}>{moment(new Date(createdAt)).format('DD-MM-YYYY')}</td>
      <td className="table__data">
        <TemplatesMenu 
          disableEnable={disabled} 
          reminder={reminder} 
          setItemToDisable={setItemToDisable} 
          conditionId={id} 
          id={reminder.id}
        />
      </td>
    </tr>
  );
};


export const reminderTable = ({ reminders, setItemToDisable }) => {
  return (
    <div className="list-templates">
      <div className="table__container">
        <table className="mdl-data-table mdl-js-data-table readiness-table">
          <thead>
            <tr>
              <th className={headClassName}>Condition Name</th>
              <th className={headClassName}>Document Type</th>
              <th className={headClassName}>Created By</th>
              <th className={headClassName}>Created on</th>
            </tr>
          </thead>
          <tbody className="table__body">
            {
              reminders && reminders.map(
                reminder => (
                  <ReminderDetails 
                    key={reminder.id} 
                    {...reminder} 
                    setItemToDisable={setItemToDisable} 
                    reminder={reminder} 
                  />
                ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};


ReminderDetails.propTypes = {
  conditionName: PropTypes.string.isRequired,
  documentType: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  createdAt: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  setItemToDisable: PropTypes.func,
  reminder: PropTypes.object,
  id: PropTypes.number,
};

ReminderDetails.defaultProps = {
  reminder: {},
  setItemToDisable: () => {},
  disabled: false,
  id: 0,
};

reminderTable.propTypes = {
  reminders: PropTypes.array.isRequired,
  setItemToDisable: PropTypes.func,
};

reminderTable.defaultProps = {
  setItemToDisable: () => { }
};



export default withLoading(reminderTable);
