import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';
import './RequestsModal.scss';

const TravelLink = ({divClass, innerClass, dynamicText,  nextClass, dynamicDate }) => {
  return (
    <div className={divClass}>
      <div className={innerClass}>
        {dynamicText}
      </div>
      <div className={nextClass}>
        {dynamicDate}
      </div>
    </div>
  );
};

TravelLink.propTypes = {
  divClass: PropTypes.string.isRequired,
  innerClass: PropTypes.string.isRequired,
  dynamicText: PropTypes.string.isRequired,
  nextClass: PropTypes.string.isRequired,
  dynamicDate:PropTypes.string.isRequired
};


export default TravelLink;
