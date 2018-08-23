import React from 'react';
import {PropTypes} from 'prop-types';

// HTML input

const HtmlInput = (props) => {
  let htmlProps = {...props};
  let { error } = props;
  let className = error? 'error': '';

  ['labelNote', 'toggleOptions', 'activeOption', 'selectedDate']
    .map(i => delete htmlProps[i]); // onChange has been included in htmlProps

  return <input {...htmlProps} className={className} />;
};

HtmlInput.propTypes = {
  error: PropTypes.string
};

HtmlInput.defaultProps = {
  error: ''
};

export default HtmlInput;
