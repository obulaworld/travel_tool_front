import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { PropTypes } from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import calendarIcon from '../../../../../images/icons/calendar_icon.svg';

const DateInput = props => {
  const { error, className, selectedDate } = props;
  let _selectedDate = selectedDate
    ? moment(selectedDate, 'MM-DD-YYYY')
    : selectedDate;

  return (
    <div className={`date-wrapper ${className}`}>
      <DatePicker
        className={`${error ? 'error' : ''}`}
        calendarClassName="calendar-body"
        dayClassName={() => 'calendar-day'}
        selected={_selectedDate}
        fixedHeight
        {...props}
      />
      <img className="calendar-icon" src={calendarIcon} alt="cal" />
    </div>
  );
};

DateInput.propTypes = {
  error: PropTypes.string,
  className: PropTypes.string,
  selectedDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
};

DateInput.defaultProps = {
  className: '',
  error: '',
  selectedDate: ''
};

export default DateInput;
