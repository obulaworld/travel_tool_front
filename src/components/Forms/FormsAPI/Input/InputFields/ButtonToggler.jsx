import React from 'react';
import {PropTypes} from 'prop-types';


const ButtonToggler = (props) => {
  const {value, onChange, choices, name, className} = props;

  const buttons = choices
    .map(option => {
      const status = option === value? 'active': 'inactive';
      return (
        <button
          key={option}
          name={name}
          onClick={(e) => {onChange(e.target.value ||
          e.target.getAttribute('data-value') ||
          e.target.dataset.value);}}
          data-value={option}
          type="button"
          className={`bg-btn bg-btn--${status}`}
        >
          {option}
        </button>
      );
    });

  return (
    <div className={`input ${className}`}>
      {buttons}
    </div>
  );
};

ButtonToggler.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  choices: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,

};

ButtonToggler.defaultProps = {
  className: ''
};

export default ButtonToggler;
