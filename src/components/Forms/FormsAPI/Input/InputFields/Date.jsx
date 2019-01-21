import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { PropTypes } from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import calendarIcon from '../../../../../images/icons/calendar_icon.svg';

class DateInput extends React.Component {
  
  state = {
    selectedDate: null,
  }

  static getDerivedStateFromProps (nextProps, nextState) {
    const { value } = nextProps;
    return { selectedDate: value ? moment(nextProps.value, 'MM-DD-YYYY') : null};
  }

  handleChange=(date, event)=> {
    const { onChange } = this.props;
    this.setState({selectedDate: date });
    date && onChange(date, event);
  }

  render(){
    const { error, className, name, onBlur } = this.props;
    const { selectedDate } = this.state;
    return (
      <div className={`date-wrapper ${className}`} id={`${name}_date`}>
        <DatePicker
          className={`${error ? 'error' : ''}`}
          calendarClassName="calendar-body"
          dayClassName={() => 'calendar-day'}
          fixedHeight
          placeholderText="MM/DD/YYYY"
          selected={selectedDate}
          onChange={(date, event) => this.handleChange(date, event)}
          name={name}
          onBlur={onBlur}
        />
        <img className="calendar-icon" src={calendarIcon} alt="cal" />
      </div>
    ); 
  }
}


DateInput.propTypes = {
  error: PropTypes.string,
  className: PropTypes.string,
  name:  PropTypes.string,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

DateInput.defaultProps = {
  className: '',
  error: '',
  name: ''
};

export default DateInput;
