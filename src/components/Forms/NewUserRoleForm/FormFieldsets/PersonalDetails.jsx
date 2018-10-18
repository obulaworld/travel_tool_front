import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import InputRenderer from '../../FormsAPI';
import * as formMetadata from '../../FormsMetadata/NewUserRoleForm';

class PersonalDetailsFiedset extends Component {
  render() {
    this.inputRenderer = new InputRenderer(formMetadata);
    const { renderInput } = this.inputRenderer;
    const { roleName, centers, myTitle } = this.props;
    const checkStatus = myTitle === 'Change Center';
    const centerLocations = centers && centers.map(center => center.location);
    formMetadata.dropdownSelectOptions.center = centerLocations;

    return (
      <fieldset className="personal-details">
        <div>
          <div style={{ paddingTop: '14px' }}>
            {renderInput('email', 'text', { disabled: checkStatus })}
          </div>
          <div>{centers && renderInput('center', 'dropdown-select')}</div>
          <div>{!roleName && renderInput('roleName', 'dropdown-select')}</div>
        </div>
      </fieldset>
    );
  }
}

const roleName = PropTypes.string;
const centers = PropTypes.array;
const myTitle = PropTypes.string;

PersonalDetailsFiedset.propTypes = {
  roleName: roleName.isRequired,
  centers: centers.isRequired,
  myTitle: myTitle.isRequired
};

export default PersonalDetailsFiedset;
