import React, { Component } from 'react';
import InputRenderer from '../../FormsAPI';
import formMetadata from '../../FormsMetadata/TravelReadinessMetaData/NewVisaMetadata';

class VisaFormFieldSet extends Component {
  render() {
    const {renderInput} = new InputRenderer(formMetadata);
    return (
      <fieldset>
        <div className="input-group visa-input">
          {renderInput('country', 'text' )}
          {renderInput('entryType', 'dropdown-select', {
            size: ''
          })}
          {renderInput('dateOfIssue', 'date')}
          {renderInput('expiryDate', 'date')}
          {renderInput('visaType', 'dropdown-select', {
            size: ''
          })}
        </div>
      </fieldset>
    );
  }
}

export default VisaFormFieldSet;
