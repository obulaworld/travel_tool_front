import React, { Component } from 'react';
import PropTypes from 'prop-types';
import toast from 'toastr';
import { isEmpty } from 'lodash';
import InputRenderer from '../../FormsAPI';
import formMetadata from '../../FormsMetadata/TravelReadinessFormMetadata/passportInputLabels';
import documentUpload from '../../../../images/icons/document-upload-blue.svg';

class PassportDetailsFieldSet extends Component{

  renderFields = () => {
    const { renderInput } = new InputRenderer({inputLabels: formMetadata });
    return(
      <fieldset>
        <div className="input-group">
          {renderInput('name', 'text', {className: 'fluid'})}
          {renderInput('passportNumber', 'text')}
          {renderInput('nationality', 'text')}
          {renderInput('dateOfBirth', 'date')}
          {renderInput('dateOfIssue', 'date')}
          {renderInput('placeOfIssue', 'text')}
          {renderInput('expiryDate', 'date')}
        </div>
      </fieldset>
    );
  };

  render() {
    return (
      <div>{this.renderFields()}</div>
    );
  }
}

export default PassportDetailsFieldSet;
