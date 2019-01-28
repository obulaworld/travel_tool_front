import React from 'react';
import { PropTypes } from 'prop-types';
import { isEmpty } from 'lodash';
import { FormContext, getDefaultBlanksValidatorFor } from '../FormsAPI';
import EmailTemplateDetails from './FormFieldSets/EmailTemplateDetails';
import './NewEmailTemplateForm.scss';
import SubmitArea from './FormFieldSets/SubmitArea';

class NewEmailTemplateForm extends React.Component {
  constructor(props) {
    super(props);
    this.defaultState = {
      optionalFields: [
        'cc'
      ],
      values: {
        name: '',
        from: '',
        cc: [],
        subject: '',
        message: ''
      },
      errors: {},
      hasBlankFields: true
    };
    this.state = {...this.defaultState};
    this.validate = getDefaultBlanksValidatorFor(this);
  }

  componentDidMount() {
    const {
      getSingleReminderEmailTemplate,
      match: { params: { templateId } },
      history,
      getAllUsersEmail,
    } = this.props;
    getSingleReminderEmailTemplate(templateId, history);
    getAllUsersEmail();
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.data && !isEmpty(nextProps.data.cc)) {
      const { data: { name, from, cc, subject, message, id } } = nextProps;

      this.setState({
        values: {
          name,
          from,
          cc: cc.filter(c => c !== '').length === 0 ? null : cc,
          subject,
          message,
          id
        }
      });
    }
    this.setState({errors: nextProps.errors});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { values, hasBlankFields } = this.state;
    const { cc } = values;
    if (!hasBlankFields) {
      const {
        createReminderEmailTemplate, history, editing,
        updateSingleReminderEmailTemplate
      } = this.props;
      if (editing) {
        updateSingleReminderEmailTemplate(
          values.id,
          history,
          {...values, cc: cc || []}
        );
      } else {
        createReminderEmailTemplate(
          {...values, cc: cc || []},
          history
        );
      }
    }
  };

  handleCancel = () => {
    const { history } = this.props;
    history.push('/settings/reminder-setup');
  };


  render () {
    const { isSaving, getUsersEmail, editing } = this.props;
    const { values, errors, hasBlankFields} = this.state;
    return (
      <FormContext
        values={values}
        errors={errors}
        targetForm={this}
        validatorName="validate"
      >
        <form className="new-email-template-form" onSubmit={this.handleSubmit}>
          <EmailTemplateDetails values={values} emails={getUsersEmail} />
          <SubmitArea
            onCancel={this.handleCancel}
            hasBlankFields={hasBlankFields}
            send={editing ? 'Update' : 'Save'}
            loading={isSaving}
          />
        </form>
      </FormContext>
    );
  }
}

NewEmailTemplateForm.defaultProps = {
  editing: false,
  createReminderEmailTemplate: () => {
  },
  getSingleReminderEmailTemplate: () => {
  },
  updateSingleReminderEmailTemplate: () => {
  },
  isSaving: false,
  data: {
    cc: []
  }
};

NewEmailTemplateForm.propTypes = {
  history: PropTypes.object.isRequired,
  isSaving: PropTypes.bool,
  errors: PropTypes.object.isRequired,
  createReminderEmailTemplate: PropTypes.func,
  editing: PropTypes.bool,
  getSingleReminderEmailTemplate: PropTypes.func,
  updateSingleReminderEmailTemplate: PropTypes.func,
  match: PropTypes.object.isRequired,
  data: PropTypes.object,
  getAllUsersEmail: PropTypes.func.isRequired,
  getUsersEmail: PropTypes.array.isRequired
};

export default NewEmailTemplateForm;
