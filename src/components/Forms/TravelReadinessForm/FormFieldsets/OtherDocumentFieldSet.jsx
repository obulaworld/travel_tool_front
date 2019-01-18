import React, { Component } from 'react';
import InputRenderer from '../../FormsAPI';
import formMetadata from '../../FormsMetadata/TravelReadinessMetaData/OtherDocumentMetaData';

class OtherDocumentFieldSet extends Component {
  render() {
    const {renderInput} = new InputRenderer(formMetadata);
    return (
      <fieldset>
        <div className="input-group visa-input">
          {renderInput('name', 'text')}
          {renderInput('dateOfIssue', 'date')}
          {renderInput(
            'documentId',
            'text',
            {
              labelNote: '(Optional)',
              required: false,
            }
          )}
          {renderInput('expiryDate', 'date')}
        </div>
      </fieldset>
    );
  }
}

export default OtherDocumentFieldSet;
