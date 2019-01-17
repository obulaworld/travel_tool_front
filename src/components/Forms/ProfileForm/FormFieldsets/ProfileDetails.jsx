import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputRenderer from '../../FormsAPI';
import * as formMetadata from '../../FormsMetadata/NewProfileMetadata';

class ProfileDetailsFieldSets extends Component {

  render() {
    const { managers, occupations, } = this.props;

    const occupationsNames = occupations.map(occupation =>
      occupation.occupationName);

    const managerNames = managers.map(manager => manager.fullName);
    formMetadata.dropdownSelectOptions.manager = managerNames;
    this.inputRenderer = new InputRenderer(formMetadata);
    const { renderInput } = this.inputRenderer;

    return (
      <fieldset className="personal-details">
        <div className="legend">
          <span className="personal-details-text">
          Personal Details
          </span>
          <span className="required-field">
          * Required Field
          </span>
        </div>
        <div className="input-group profile-input">
          <div>
            {renderInput('name', 'text',{ disabled: true })}
          </div>
          {renderInput('gender', 'button-toggler')}
          <div>
            {renderInput('role', 'text', { disabled: true })}
          </div>
          <div>
            {renderInput('department', 'text', { disabled: true })}
          </div>
          {renderInput('manager', 'filter-dropdown-select', {
            className: 'profile_dropdown no-disable', size: '' })}
        </div>
      </fieldset>
    );
  }
}
ProfileDetailsFieldSets.propTypes = {
  managers: PropTypes.array,
  occupations: PropTypes.array
};
ProfileDetailsFieldSets.defaultProps = {
  managers: [],
  occupations: []
};
export default ProfileDetailsFieldSets;
