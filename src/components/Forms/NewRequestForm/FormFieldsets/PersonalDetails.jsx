import React, {Component} from 'react';
import InputRenderer from '../../FormsAPI';
import * as formMetadata from '../../FormsMetadata/NewRequestFormMetadata';

class PersonalDetailsFiedset extends Component {

  render() {
    this.inputRenderer = new InputRenderer(this.props, formMetadata);
    const { renderInput } = this.inputRenderer;

    return (
      <fieldset className="personal-details">
        <legend>
          Personal Details
        </legend>
        <div className="input-group">
          {renderInput('fullname', 'text')}
          {renderInput('gender', 'button-toggler')}
          {renderInput('department', 'dropdown-select')}
          {renderInput('role', 'dropdown-select')}
          {renderInput('manager', 'text')}
        </div>
      </fieldset>
    );
  }
}

export default PersonalDetailsFiedset;
