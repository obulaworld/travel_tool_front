import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputRenderer from '../../FormsAPI';
import * as formMetadata from '../../FormsMetadata/NewProfileMetadata';

class ProfileDetailsFieldSets extends Component {

  renderFieldSet = (renderInput) =>  (
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
        {renderInput('location', 'dropdown-select', {
          className: 'profile_dropdown no-disable', size: ''
        })}
      </div>
    </fieldset>
  );

  render() {
    const { managers, centers} = this.props;

    const managerNames = managers.map(manager => manager.fullName);
    const centerNames = centers.map(center => center.location.split(',')[0]);

    formMetadata.dropdownSelectOptions.manager = managerNames;
    formMetadata.dropdownSelectOptions.location = centerNames;


    this.inputRenderer = new InputRenderer(formMetadata);
    const { renderInput } = this.inputRenderer;

    return (this.renderFieldSet(renderInput) );
  }
}
ProfileDetailsFieldSets.propTypes = {
  managers: PropTypes.array,
  centers: PropTypes.array
};

ProfileDetailsFieldSets.defaultProps = {
  managers: [],
  centers: []
};
export default ProfileDetailsFieldSets;
