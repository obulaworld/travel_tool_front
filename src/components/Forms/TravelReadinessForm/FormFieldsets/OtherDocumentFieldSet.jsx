import React, { Component } from 'react';
import moment from 'moment';
import InputRenderer from '../../FormsAPI';
import formMetadata from '../../FormsMetadata/TravelReadinessMetaData/OtherDocumentMetaData';

class OtherDocumentFieldSet extends Component {
  render() {
    const {renderInput} = new InputRenderer(formMetadata);
    return (
      <fieldset>
        <div className="input-group visa-input">
          {renderInput('name', 'text')}
          {renderInput(
            'dateOfIssue',
            'date',
            {
              labelNote: '(Optional)',
              required: false,
              maxDate: moment()
            }
          )}
          {renderInput(
            'documentId',
            'text',
            {
              labelNote: '(Optional)',
              required: false,
            }
          )}
          {renderInput('expiryDate', 'date', {minDate: moment()})}
        </div>
      </fieldset>
    );
  }
}

export default OtherDocumentFieldSet;
