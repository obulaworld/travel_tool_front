import React from 'react';
import { PropTypes } from 'prop-types';
import './_overlay.scss';

const Overlay = (props) => {
  const {className, click, children} = props;
  return (
    <div
      role="button"
      tabIndex="0"
      onClick={click}
      onKeyPress={()=>{}}
      className={`overlay ${className}`}
    >
      {children}
    </div>
  );
};

Overlay.propTypes = {
  className: PropTypes.string.isRequired,
  click: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.object, PropTypes.array
  ]).isRequired
};

Overlay.defaultProps = {
  click: null,
};

export default Overlay;
