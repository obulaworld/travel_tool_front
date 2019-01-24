import React from 'react';
import Icon from '../../images/no-document.svg';
import './emailReminderSetup.scss';

const NoEmailReminder = () => {
  return (
    <div className="no-email-icon">
      <img src={Icon} alt="" />
      <p>
        No email reminders available
      </p>
    </div>
  );
};

export default NoEmailReminder;
