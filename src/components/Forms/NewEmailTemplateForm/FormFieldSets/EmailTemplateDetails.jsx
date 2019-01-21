import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import InputRenderer from '../../FormsAPI';
import formMetaData from '../../FormsMetadata/NewEmailTemplateFormMetadata';
import {KeyCodes} from '../../FormsAPI/Input/InputFields/TagsInput';

class EmailTemplateDetails extends Component{

  render () {
    const { values: { cc }} = this.props;
    this.inputRenderer = new InputRenderer(formMetaData);
    const { renderInput } = this.inputRenderer;
    return (
      <fieldset className="form-fields">
        <div className="input-group">
          {renderInput('name','text')}
          <div className="emails">
            {renderInput('from','text')}
            {renderInput('cc', 'tags',
              {
                placeholder: `${ cc && cc.length < 10 ? 'Add an email': ''}`,
                required: false,
                max: 10,
                delimiters: [KeyCodes.COMMA, KeyCodes.ENTER, KeyCodes.TAB]
              })
            }
          </div>
          {renderInput('subject', 'text')}
          {renderInput('message', 'textarea', { className: 'email-message'})}
        </div>
      </fieldset>
    );
  }
}

EmailTemplateDetails.propTypes = {
  values: PropTypes.object.isRequired
};
export default EmailTemplateDetails;
