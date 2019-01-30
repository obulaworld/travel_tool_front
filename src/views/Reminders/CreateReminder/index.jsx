import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PageHeader from '../../../components/PageHeader';
import Button from '../../../components/buttons/Buttons';
import '../Reminder.scss';
import ReminderForm from '../../../components/Forms/ReminderForm';
import SelectDropDown from '../../../components/SelectDropDown/SelectDropDown';
import downArrow from '../../../images/downArrowBlue.svg';
import { fetchAllEmailTemplates } from '../../../redux/actionCreator/listEmailTemplatesActions';
import { createReminder, editReminder, getSingleReminder } from '../../../redux/actionCreator/reminderActions';

const dropDownItems = [
  {
    name: 'Passport',
    value: 'Passport'
  },
  {
    name: 'Visa',
    value: 'Visa'
  },
];

class CreateReminder extends Component {
  state = {
    documentType: ''
  };

  componentDidMount() {
    const { fetchAllEmailTemplates } = this.props;
    fetchAllEmailTemplates('');
  }

  setReminderFormDocumentType = (documentType) => {
    this.setState({
      documentType
    });
  }

  isEditMode() {
    const { location: { pathname } } = this.props;
    const mode = pathname.split('/')[3];
    return mode === 'edit';
  }

  renderReminderForm(documentType) {
    const { templates, 
      fetchAllEmailTemplates, 
      currentPage, 
      loading, 
      pageCount, 
      createReminder, 
      getsingleReminder, 
      singleReminder,
      editReminder,
      editModeErrors
    } = this.props;
    return (
      <ReminderForm 
        documentType={documentType} 
        {...this.props} currentPage={currentPage} 
        pageCount={pageCount} templates={templates} 
        loading={loading} fetchAllEmailTemplates={fetchAllEmailTemplates} 
        createReminder={createReminder}
        editReminder={editReminder}
        setReminderType={this.setReminderFormDocumentType}
        getsingleReminder={getsingleReminder}
        isEditMode={this.isEditMode()}
        editModeErrors={editModeErrors}
        singleReminder={singleReminder}
      />
    );
  }

  render() {
    const { documentType } = this.state;
    return (
      <Fragment>
        <div className="reminder-panel-header">
          <PageHeader
            addLink
            title={`${this.isEditMode() ? 'EDIT A REMINDER FOR': 'CREATE A REMINDER FOR'}`}
            iconLink="/settings/reminders"
          >
            <SelectDropDown
              placeHolder={!documentType ? 'Select Document' : ''} 
              onClickItem={this.setReminderFormDocumentType} 
              defaultSelected={documentType}
              dropDownItems={dropDownItems} 
              dropDownIcon={downArrow} 
            />
          </PageHeader>
          <div className="reminder-card">
            {this.renderReminderForm(documentType)}
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({reminders, listEmailTemplatesReducer}) => ({
  templates: reminders.templates,
  currentPage: reminders.currentPage,
  pageCount: listEmailTemplatesReducer.pagination.pageCount,
  loading: reminders.isLoading,
  errors: reminders.newReminder.errors,
  singleReminder: reminders.singleReminder,
  editModeErrors: reminders.updatedReminder.errors,
});

const mapDispatchToProps = {
  fetchAllEmailTemplates,
  createReminder,
  editReminder,
  getSingleReminder,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateReminder);
