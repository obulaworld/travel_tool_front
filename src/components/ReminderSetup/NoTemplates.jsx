import React from 'react';
import  * as PropTypes from 'prop-types';
import Icon from '../../images/no-document.svg';
import './templates.scss';

const NoTemplates = ({message}) => (
  <div className="no-templates list-templates">
    <div className="content">
      <img src={Icon} alt="" />
      <p>
        {message || 'No Email Templates have been created'}
      </p>
    </div>
  </div>
);

NoTemplates.propTypes  = {
  message: PropTypes.string
};

NoTemplates.defaultProps = {
  message: 'No Email Templates have been created'
};
export default NoTemplates;
