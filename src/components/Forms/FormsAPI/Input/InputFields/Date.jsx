import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { PropTypes } from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import calendarIcon from '../../../../../images/icons/calendar_icon.svg';

const DateInput = props => {
  const { error, className, selectedDate, name} = props;
  let _selectedDate = selectedDate
    ? moment(selectedDate, 'MM-DD-YYYY')
    : selectedDate;


  return (
    <div className={`date-wrapper ${className}`} id={`${name}_date`}>
      <DatePicker
        className={`${error ? 'error' : ''}`}
        calendarClassName="calendar-body"
        dayClassName={() => 'calendar-day'}
        fixedHeight
        selected={_selectedDate}
        {...props}
      />
      <img className="calendar-icon" src={calendarIcon} alt="cal" />
    </div>
  );
};

DateInput.propTypes = {
  error: PropTypes.string,
  className: PropTypes.string,
  name:  PropTypes.string,
  selectedDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
};

DateInput.defaultProps = {
  className: '',
  error: '',
  selectedDate: '',
  name: ''
};

export default DateInput;
