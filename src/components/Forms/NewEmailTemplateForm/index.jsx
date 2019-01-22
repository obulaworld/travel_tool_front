import React  from 'react';
import { PropTypes } from 'prop-types';
import {  FormContext , getDefaultBlanksValidatorFor} from '../FormsAPI';
import EmailTemplateDetails from './FormFieldSets/EmailTemplateDetails';
import './NewEmailTemplateForm.scss';
import SubmitArea from './FormFieldSets/SubmitArea';

class NewEmailTemplateForm extends React.Component{
  constructor(props){
    super(props);
    this.defaultState = {
      optionalFields: [
        'cc'
      ],
      values: {
        name: '',
        from: '',
        cc: [
        ],
        subject: '',
        message: ''
      },
      errors: {},
      hasBlankFields: true
    };
    this.state = {...this.defaultState};
    this.validate = getDefaultBlanksValidatorFor(this);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({ errors: nextProps.errors});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { values, hasBlankFields } = this.state;
    if( !hasBlankFields ){
      const { createReminderEmailTemplate, history } = this.props;
      createReminderEmailTemplate(values, history);
    }
  };

  handleCancel = () => {
    const { history } = this.props;
    history.push('/settings/reminder-setup');
  };


  render () {
    const { isSaving } = this.props;
    const { values, errors, hasBlankFields} = this.state;
    return (
      <FormContext
        values={values}
        errors={errors}
        targetForm={this}
        validatorName="validate"
      >
        <form className="new-email-template-form" onSubmit={this.handleSubmit}>
          <EmailTemplateDetails values={values} />
          <SubmitArea
            onCancel={this.handleCancel}
            hasBlankFields={hasBlankFields}
            send="Save"
            loading={isSaving}
          />
        </form>
      </FormContext>
    );
  }
}

NewEmailTemplateForm.propTypes = {
  history: PropTypes.object.isRequired,
  isSaving: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  createReminderEmailTemplate: PropTypes.func.isRequired
};

export default NewEmailTemplateForm;
