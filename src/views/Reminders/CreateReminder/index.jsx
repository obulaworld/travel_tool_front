import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PageHeader from '../../../components/PageHeader';
import '../Reminder.scss';
import ReminderForm from '../../../components/Forms/ReminderForm';
import SelectDropDown from '../../../components/SelectDropDown/SelectDropDown';
import downArrow from '../../../images/downArrowBlue.svg';
import { fetchAllEmailTemplates } from '../../../redux/actionCreator/listEmailTemplatesActions';
import { createReminder } from '../../../redux/actionCreator/reminderActions';

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

  render() {
    const { documentType } = this.state;
    const { templates, fetchAllEmailTemplates, currentPage, loading, pageCount, createReminder } = this.props;
    return (
      <Fragment>
        <div className="reminder-panel-header">
          <PageHeader
            addLink
            title="CREATE A REMINDER FOR"
            iconLink="/settings/reminders"
          >
            <SelectDropDown
              placeHolder="Select Document"
              onClickItem={this.setReminderFormDocumentType}
              dropDownItems={dropDownItems}
              dropDownIcon={downArrow}
            />
          </PageHeader>
          <div className="reminder-card">
            <ReminderForm
              documentType={documentType} {...this.props}
              currentPage={currentPage} pageCount={pageCount}
              templates={templates} loading={loading}
              fetchAllEmailTemplates={fetchAllEmailTemplates} createReminder={createReminder}
            />
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
  errors: reminders.newReminder.errors
});

const mapDispatchToProps = {
  fetchAllEmailTemplates,
  createReminder,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateReminder);
