import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import InputRenderer from '../../FormsAPI';
import * as formMetadata from '../../FormsMetadata/NewUserRoleForm';

class PersonalDetailsFiedset extends Component {
  renderCenterField(roleName, renderInput) {
    if (roleName.toLowerCase() === 'travel team member') {
      return renderInput('center', 'dropdown-select',
        { required: true, className: 'request_dropdown',size: '' });
    }
    return renderInput('center', 'dropdown-select',
      {
        labelNote: '(Optional)',
        required: false,
        className: 'request_dropdown',
        size: ''
      });
  }

  renderRmailField(emails, renderInput) {
    
  }
  render() {
    
    const { roleName, centers, myTitle, allMails } = this.props;
    const checkStatus = myTitle === 'Change Center';
    const centerLocations = centers && centers.map(center => center.location);
    formMetadata.dropdownSelectOptions.center = centerLocations;
    const emails = allMails.map(email=>email.text);
    formMetadata.dropdownSelectOptions.email = emails;
    this.inputRenderer = new InputRenderer(formMetadata);
    const { renderInput } = this.inputRenderer;

    return (
      <fieldset className="personal-details">
        <div>
          <div style={{ paddingTop: '14px' }}>
            {renderInput('email', 'filter-dropdown-select', 
              { className: 'email_dropdown', 
                disabled: checkStatus, size: '' 
              })
            }
          </div>
          <div>{centers && this.renderCenterField(roleName, renderInput)}</div>
        </div>
      </fieldset>
    );
  }
}

const roleName = PropTypes.string;
const centers = PropTypes.array;
const myTitle = PropTypes.string;
const allMails = PropTypes.array;

PersonalDetailsFiedset.propTypes = {
  roleName: roleName.isRequired,
  centers: centers.isRequired,
  myTitle: myTitle.isRequired,
  allMails: allMails.isRequired,
};

export default PersonalDetailsFiedset;
