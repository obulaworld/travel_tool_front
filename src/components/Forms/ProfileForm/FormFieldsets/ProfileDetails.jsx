import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputRenderer from '../../FormsAPI';
import * as formMetadata from '../../FormsMetadata/NewProfileMetadata';

class ProfileDetailsFieldSets extends Component {
  render() {
    const { managers } = this.props;
    const managerNames = managers.map(manager => manager.fullName);
    formMetadata.dropdownSelectOptions.manager = managerNames;

    this.inputRenderer = new InputRenderer(formMetadata);
    const { renderInput } = this.inputRenderer;
    const { hasBlankFields } = this.props;

    return (
      <fieldset className="personal-details">
        <legend style={{width: '100%'}}>
          <span className="personal-details-text">
          Personal Details
          </span>
          <span className="required-field">
          * Required Field
          </span>
          <div className="profile-divider" />
        </legend>
        <div className="input-group profile-input">
          {renderInput('name', 'text')}
          {renderInput('gender', 'button-toggler')}
          {renderInput('role', 'dropdown-select')}
          {renderInput('department', 'dropdown-select')}
          {renderInput('manager', 'dropdown-select')}
        </div>
      </fieldset>
    );
  }
}
ProfileDetailsFieldSets.propTypes = {
  managers: PropTypes.array,
  hasBlankFields: PropTypes.bool.isRequired,
};
ProfileDetailsFieldSets.defaultProps = {
  managers: [],
};

export default ProfileDetailsFieldSets;
