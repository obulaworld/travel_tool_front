import React, { Component } from 'react';
import moment from 'moment';
import InputRenderer from '../../FormsAPI';
import formMetadata from '../../FormsMetadata/TravelReadinessMetaData/NewVisaMetadata';

class VisaFormFieldSet extends Component {
  render() {
    const {renderInput} = new InputRenderer(formMetadata);
    return (
      <fieldset>
        <div className="input-group visa-input">
          {renderInput('country', 'text')}
          {renderInput('entryType', 'dropdown-select', {
            size: ''
          })}
          {renderInput('dateOfIssue', 'date', {
            maxDate: moment(),
            showYearDropdown: true
          })}
          {renderInput('expiryDate', 'date', {
            minDate: moment(),
            showYearDropdown: true
          })}
          {renderInput('visaType', 'dropdown-select', {
            size: ''
          })}
        </div>
      </fieldset>
    );
  }
}

export default VisaFormFieldSet;
