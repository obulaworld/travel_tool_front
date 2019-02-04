import React, { Component } from 'react';
import PropTypes from 'prop-types';
import toast from 'toastr';
import { isEmpty } from 'lodash';
import moment from 'moment';
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
          {renderInput('dateOfBirth', 'date', {
            openToDate: moment().subtract( 18, 'years'),
            maxDate: moment().subtract( 18, 'years').add(1, 'month'),
            showYearDropdown: true
          })}
          {renderInput('dateOfIssue', 'date', {maxDate: moment()})}
          {renderInput('placeOfIssue', 'text')}
          {renderInput('expiryDate', 'date', { minDate: moment()})}
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
