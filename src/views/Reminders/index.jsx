import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ReminderTable from './ReminderTable';
import PageHeader from '../../components/PageHeader';
import {
  fetchEmailReminder,
  disableReminderCondition,
  enableDisabledReminderCondition
} from '../../redux/actionCreator/emailReminderAction';
import NoEmailReminder from '../../components/EmailReminderSetup/NoEmailReminder';
import './Reminder.scss';
import { openModal, closeModal } from '../../redux/actionCreator/modalActions';
import DisableReminderTemplateForm from '../../components/Forms/DisableReminderTemplateForm/DisableReminderTemplate';
import EnableDisabledReminderConditionForm from '../../components/Forms/EnableDisabledReminderConditionForm/EnableReminderEmailTemplateForm';
import TemplatesPagination from '../../components/ReminderSetup/TemplatesPagination';


export class Reminders extends Component{

  constructor(props) {
    super(props);
    this.state = {
      activeDocument: 'passport',
      disableReason: '',
      conditionId: '',
      conditionName: '',
      conditionReason: ''
    };
  }

  componentDidMount() {
    const {fetchEmailReminder} = this.props;
    fetchEmailReminder({document: 'passport'});
  }

  setItemToDisable = (reminder, reason, event) => {
    const { openModal } = this.props;
    if (reminder.disabled && event.target.textContent === 'Enable') {
      this.setState({
        conditionId: reminder.id,
      });
      openModal(true, 'enable disabled reminder');
    } else {
      this.setState({
        conditionId: reminder.id,
        conditionName: reminder.conditionName,
        conditionReason: reason || ''
      });
      openModal(true, 'disable reminder condtion');
    }
  }

  handleInputChange = (event) => {
    this.setState({ disableReason: event.target.value });
  }

  disableEmailReminder = (event) => {
    event.preventDefault();
    const { disableReminderCondition } = this.props;
    const { conditionId } = this.state;
    disableReminderCondition(conditionId, this.state);
    this.setState({ disableReason: null });
  }

  enableDisabledReminder = (event) => {
    event.preventDefault();
    const { enableDisabledReminderCondition } = this.props;
    const { conditionId } = this.state;
    enableDisabledReminderCondition(conditionId);
  }

  onPageChangeEvent = (previousOrNext) => {
    const { activeDocument: document } = this.state;
    const { fetchEmailReminder, meta: {pagination: {currentPage}} } = this.props;
    const params = {
      page : currentPage + (previousOrNext === 'previous' ? -1 : 1),
      document
    };
    fetchEmailReminder(params);

  };


  isActive = (buttonState) => {
    const {activeDocument} = this.state;
    return activeDocument === buttonState;
  };

  toggleButton = (type) => {
    const {fetchEmailReminder} = this.props;
    fetchEmailReminder({ document: type});
    return this.setState({activeDocument: type});
  };

  renderDisableReminderConditionForm() {
    const { shouldOpen, modalType, closeModal } = this.props;
    const { itemName, disableReason, templateReason, conditionReason } = this.state;
    return (
      <DisableReminderTemplateForm
        shouldOpen={shouldOpen} disableEmailReminder={this.disableEmailReminder}
        handleInputChange={this.handleInputChange} itemName={itemName} disableReason={disableReason}
        modalType={modalType} closeModal={closeModal} templateReason={templateReason} conditionReason={conditionReason} />
    );
  }

  renderEnableDisabledReminderConditionForm() {
    const { shouldOpen, modalType, closeModal } = this.props;
    const { itemName } = this.state;
    return (
      <EnableDisabledReminderConditionForm
        shouldOpen={shouldOpen} enableDisabledReminderCondition={this.enableDisabledReminder}
        itemName={itemName} modalType={modalType} closeModal={closeModal} />
    );
  }

  renderReminderDocumentButton = (text, active, onclick, total, otherProps) => {

    let className = 'document-button_group';
    return (
      <button
        className={`${className}${active? '__active': '__inactive'}`}
        type="button"
        onClick={onclick}
        {...otherProps}
      >
        {text}
        &ensp;
        <span>
          {total && total !== 0 && total}
        </span>
      </button>
    );
  };


  renderButtonGroup = () => {
    const {meta, history} = this.props;
    return (
      <div className="document_header_group_button">
        <div>
          {this.renderReminderDocumentButton('Passports',
            this.isActive('passport'),
            () =>this.toggleButton('passport'),
            meta.documentCount.Passport || 0,
            {id: 'passportButton'}
          )}

          {this.renderReminderDocumentButton('Visas',
            this.isActive('visa'),
            () =>this.toggleButton('visa'),
            meta.documentCount.Visa || 0,
            {id: 'visaButton'}
          )}
        </div>
        <button
          onClick={() => { history.push('/settings/reminders/create');}}
          type="button"
          className="create-new">
          CREATE NEW
        </button>
      </div>
    );
  };

  renderRemindersTable = () => {
    const { reminders } = this.props;
    return (
      <Fragment>
        <ReminderTable 
          fetchEmailReminder={fetchEmailReminder}
          reminders={reminders} 
          setItemToDisable={this.setItemToDisable} 
        />
      </Fragment>
    );
  }

  renderRemindersPagination = () => {
    const { meta: {pagination} } = this.props;
    return (
      <Fragment>
        <TemplatesPagination
          onPageChange={this.onPageChangeEvent}
          pageCount={pagination.pageCount?pagination.pageCount: 1}
          currentPage={pagination.currentPage? pagination.currentPage: 1}
        />
      </Fragment>
    );
  }

  render() {
    const { reminders, meta: {pagination} } = this.props;
    return (
      <Fragment>
        <PageHeader
          title="REMINDER CONDITIONS"
        />
        {this.renderButtonGroup()}
        { reminders && reminders.length === 0 ?
          <div><NoEmailReminder /></div> :(
            <div>
              {' '}
              { this.renderRemindersTable() }
              { this.renderRemindersPagination() }
            </div>
          )
        }
        {this.renderDisableReminderConditionForm()}
        {this.renderEnableDisabledReminderConditionForm()}
      </Fragment>
    );
  }
}

const mapDispatchToProps = {
  openModal,
  closeModal,
  fetchEmailReminder,
  disableReminderCondition,
  enableDisabledReminderCondition
};

const mapStateToProps = ({ modal,emailReminders}) => ({
  ...modal.modal,
  ...emailReminders
});

Reminders.propTypes = {
  history: PropTypes.object.isRequired,
  disableReminderCondition: PropTypes.func.isRequired,
  enableDisabledReminderCondition: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Reminders);
