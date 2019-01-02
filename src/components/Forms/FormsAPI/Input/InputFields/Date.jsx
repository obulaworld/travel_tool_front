import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { PropTypes } from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import calendarIcon from '../../../../../images/icons/calendar_icon.svg';

const DateInput = props => {
  const { error, value, className, name} = props;
  let selectedDate = value
    ? moment(value, 'MM-DD-YYYY')
    : null;


  return (
    <div className={`date-wrapper ${className}`} id={`${name}_date`}>
      <DatePicker
        className={`${error ? 'error' : ''}`}
        calendarClassName="calendar-body"
        dayClassName={() => 'calendar-day'}
        fixedHeight
        selected={selectedDate}
        {...props}
      />
      <img className="calendar-icon" src={calendarIcon} alt="cal" />
    </div>
  );
};

DateInput.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]),
  error: PropTypes.string,
  className: PropTypes.string,
  name:  PropTypes.string,
};

DateInput.defaultProps = {
  value: null,
  className: '',
  error: '',
  name: ''
};

export default DateInput;
