import React from 'react';
import Icon from '../../images/no-document.svg';
import './templates.scss';

const NoTemplates = () => (
  <div className="no-templates list-templates">
    <div className="content">
      <img src={Icon} alt="" />
      <p>
        No Email Templates have been created
      </p>
    </div>
  </div>
);
export default NoTemplates;
