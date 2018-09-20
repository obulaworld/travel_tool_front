import React, { Component } from 'react';
import InputRenderer from '../../FormsAPI';
import * as formMetadata from '../../FormsMetadata/NewUserRoleForm';

class PersonalDetailsFiedset extends Component {
  render() {
    this.inputRenderer = new InputRenderer(this.props, formMetadata);
    const { renderInput } = this.inputRenderer;

    return (
      <fieldset className="personal-details">
        <div className="input-group">
          <div style={{ width: ' 232px', marginRight: '30px' }}>
            {renderInput('email', 'text')}
          </div>
          {renderInput('roleName', 'dropdown-select')}
        </div>
      </fieldset>
    );
  }
}

export default PersonalDetailsFiedset;
