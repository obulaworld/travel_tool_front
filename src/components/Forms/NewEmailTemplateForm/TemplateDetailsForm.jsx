import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import  InputRenderer from '../FormsAPI';
import FormContext from '../FormsAPI/FormContext/FormContext';
import formMetadata from '../FormsMetadata/TemplateDetailsMetadata/TemplateDetailsLabels';
import './NewEmailTemplateForm.scss';
import SubmitArea from './FormFieldSets/SubmitArea';

class TemplateDetailsForm extends PureComponent {

  onCancel = (event) => {
    event.preventDefault();
    const { closeModal } = this.props;
    closeModal();
  };

  render() {

    const { renderInput } = new InputRenderer({inputLabels: formMetadata });
    const { selectedTemplate } = this.props;
    return (
      <div>

        <FormContext
          targetForm={this}
          validatorName="myCustomValidator" // uses FormAPI's default validator if this is undefined
        >
          <form className="template-details">
            <fieldset>
              <div className="input-group template-details">
                {renderInput('subject', 'text', {className: 'subject-input',
                  disabled: true, value: selectedTemplate.subject })}
                {renderInput('message', 'textarea', {className: 'message-input',
                  disabled: true, value: selectedTemplate.message})}
              </div>
              <hr />
            </fieldset>
            <SubmitArea
              onCancel={this.onCancel}
              send="Edit template"
              reversed
            />
          </form>
        </FormContext>
      </div>
    );
  }
}

TemplateDetailsForm.propTypes = {
  selectedTemplate: PropTypes.object,
  closeModal: PropTypes.func
};

TemplateDetailsForm.defaultProps = {
  selectedTemplate: {},
  closeModal: () => {}
};


export default TemplateDetailsForm;
