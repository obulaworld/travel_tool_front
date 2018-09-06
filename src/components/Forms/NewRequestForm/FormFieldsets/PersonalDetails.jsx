import React, {Component} from 'react';
import PropTypes from 'prop-types';
import InputRenderer from '../../FormsAPI';
import * as formMetadata from '../../FormsMetadata/NewRequestFormMetadata';

class PersonalDetailsFieldset extends Component {

  render() {
    const { managers } = this.props;
    const managerNames = managers.map(manager => manager.fullName);
    formMetadata.dropdownSelectOptions.manager = managerNames;

    this.inputRenderer = new InputRenderer(this.props, formMetadata);
    const { renderInput } = this.inputRenderer;

    return (
      <fieldset className="personal-details">
        <legend style={{width: '100%'}}>
          Personal Details 
          <span className="required-field">
          * Required Field
          </span>
        </legend>
        <div className="input-group">
          {renderInput('name', 'text')}
          {renderInput('gender', 'button-toggler')}
          {renderInput('department', 'dropdown-select')}
          {renderInput('role', 'dropdown-select')}
          {renderInput('manager', 'dropdown-select')}
        </div>
      </fieldset>
    );
  }
}

PersonalDetailsFieldset.propTypes = {
  managers: PropTypes.array
};

PersonalDetailsFieldset.defaultProps = {
  managers: []
};

export default PersonalDetailsFieldset;
