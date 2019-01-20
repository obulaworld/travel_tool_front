import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormContext, getDefaultBlanksValidatorFor } from '../FormsAPI';
import SubmitArea from '../NewRequestForm/FormFieldsets/SubmitArea';
import ReminderFormInputFields from './ReminderFormFieldSets/ReminderFormInputFields';

class ReminderForm extends Component {
  constructor(props) {
    super(props);

    const initialReminderFieldsValues = {
      ...this.getReminderFieldsValues(0),
      ...this.getReminderFieldsValues(1),
    };

    this.initialState = {
      values: {
        conditionName: '',
        ...initialReminderFieldsValues
      },
      hasBlankFields: true,
      errors: {},
      totalReminders: 2,
      reminders: [],
    };

    this.state = { ...this.initialState };
    this.validate = getDefaultBlanksValidatorFor(this);
  }

  componentWillReceiveProps(nextProps) {
    const { errors } = nextProps;
    this.setState({ errors });
  }

  getReminderFieldsValues = (index) => ({
    [`reminderTemplate-${index}`]: '',
    [`date-${index}`]: '',
    [`period-${index}`]: 'Months',
  });

  addNewReminder = () => {
    const { totalReminders, values } = this.state;
    const newReminderFieldValues = this.getReminderFieldsValues(totalReminders);

    this.setState({
      values: { ...values, ...newReminderFieldValues },
      totalReminders: totalReminders+ 1,
    }, this.validate);
  }

  removeReminder = (reminderIndex) => {
    const reminderFieldDefaults = ['reminderTemplate', 'date', 'period'];
    const { totalReminders, errors, values, reminders } = this.state;
    const newValues = { ...values };
    const newErrors = { ...errors };
    const newReminders = [...reminders ];

    reminderFieldDefaults.map((field) => {
      let index = reminderIndex;
      while (index < totalReminders) {
        newValues[`${field}-${index}`] = newValues[`${field}-${index + 1}`];
        index++;
      }

      delete newValues[`${field}-${index - 1}`];
      delete errors[`${field}-${index - 1}`];
    });

    newReminders.splice(reminderIndex, 1);

    this.setState((prevState) => {
      return {
        totalReminders: prevState.totalReminders - 1,
        values: newValues,
        errors: newErrors,
        reminders: newReminders,
      };
    }, this.validate);
  }

  handleCancel = () => {
    this.setState({ ...this.initialState });
  }

  updateReminderFormState = (formFieldId, formFieldName, value ) => {
    const { reminders } = this.state;
    const newReminders = [...reminders];

    if (!newReminders[formFieldId]) {
      newReminders[formFieldId] = {
        period: 'Months'
      };
    }

    newReminders[formFieldId][formFieldName.replace(/-\d+/, '')] = value;
    this.setState(prevState => ({
      ...prevState,
      values: {
        ...prevState.values,
        [formFieldName]: value
      },
      reminders: newReminders
    }), this.validate);
  }

  handleInputChange = (event) => {
    const { name, value, id } = event.target;
    this.updateReminderFormState(id, name, value);
  }

  handleReminderTemplateChange = (value, id) => {
    this.updateReminderFormState(id, `reminderTemplate-${id}`, value);
  }

  handleReminderPeriodChange = (value, id) => {
    this.updateReminderFormState(id, `period-${id}`, value);
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const { reminders, values: { conditionName } } = this.state;
    const { createReminder, documentType, history } = this.props;

    const reminderList = reminders.map((reminder) => {
      return {
        frequency: `${reminder.date} ${reminder.period}`,
        reminderEmailTemplateId: reminder.reminderTemplate,
      };
    });

    const payload = {
      conditionName,
      documentType,
      reminders: reminderList,
    };
    createReminder(payload, history);
  }

  render() {
    const { hasBlankFields, errors, values, totalReminders } = this.state;
    const {
      documentType,
      templates,
      currentPage,
      loading,
      fetchAllEmailTemplates,
      pageCount
    } = this.props;
    return (
      <FormContext values={values} targetForm={this} errors={errors}>
        <form onSubmit={this.handleFormSubmit}>
          <ReminderFormInputFields
            totalReminders={totalReminders}
            addNewReminder={this.addNewReminder}
            removeReminder={this.removeReminder}
            onInputChange={this.handleInputChange}
            onReminderTemplateChange={this.handleReminderTemplateChange}
            onReminderPeriodChange={this.handleReminderPeriodChange}
            templates={templates}
            currentPage={currentPage}
            loading={loading}
            pageCount={pageCount}
            fetchAllEmailTemplates={fetchAllEmailTemplates}
          />
          <SubmitArea
            send="Save"
            hasBlankFields={hasBlankFields || !documentType}
            onCancel={this.handleCancel}
          />
        </form>
      </FormContext>
    );
  }
}

ReminderForm.propTypes = {
  documentType: PropTypes.string,
  templates: PropTypes.array,
  currentPage: PropTypes.number,
  fetchAllEmailTemplates: PropTypes.func.isRequired,
  createReminder: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  pageCount: PropTypes.number,
  errors: PropTypes.object,
  history: PropTypes.object.isRequired,
};

ReminderForm.defaultProps = {
  documentType: '',
  templates: [],
  currentPage: 1,
  pageCount: 100,
  errors: {},
};

export default ReminderForm;
