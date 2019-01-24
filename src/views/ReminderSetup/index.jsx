import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAllEmailTemplates } from '../../redux/actionCreator/listEmailTemplatesActions';
import ListEmailTemplates from '../../components/ReminderSetup/ListEmailTemplates';
import PageHeader from '../../components/PageHeader';
import Base from '../Base';
import {  enableReminderEmailTemplate } from '../../redux/actionCreator/reminderManagementActions';
import { openModal, closeModal } from '../../redux/actionCreator/modalActions';

import EnableEmailReminderTemplateForm 
  from '../../components/Forms/EnableReminderEmailTemplateForm/EnableReminderEmailTemplateForm';

export class ReminderSetup extends Base{
  state = { templateId: '' }

  setItemToDisable = (template, disabled) => {
    const { openModal } = this.props;
    if(disabled === true){
      this.setState({
        templateId: template.id,
      });
      openModal(true, 'enable reminder template');
    }
  }

  enableReminderTemplate = (event) => {
    event.preventDefault();
    const { enableReminderEmailTemplate } = this.props;
    const { templateId } = this.state;
    enableReminderEmailTemplate(templateId);
  }

  renderEnableReminderTemplateForm() {
    const { shouldOpen, modalType, closeModal } = this.props;
    const { itemName } = this.state;
    return (
      <EnableEmailReminderTemplateForm
        shouldOpen={shouldOpen} enableReminderTemplate={this.enableReminderTemplate}
        itemName={itemName} modalType={modalType} closeModal={closeModal} />
    );
  }

  render() {
    const { history,fetchTemplates, listEmailTemplatesReducer, location } = this.props;
    return (
      <Fragment>
        <div className="readiness-header">
          <div className="templates-header">
            <PageHeader
              title="EMAIL TEMPLATES"
              actionBtn="CREATE NEW"
              actionBtnClickHandler={() => {
                history.push('/settings/reminder-setup/create');
              }}
            />
          </div>
        </div>
        <ListEmailTemplates
          fetchTemplates={fetchTemplates}
          listEmailTemplatesReducer={listEmailTemplatesReducer}
          location={location}
          setItemToDisable={this.setItemToDisable}
        />
        {this.renderEnableReminderTemplateForm()}
      </Fragment>
    );
  }
}

const mapDispatchToProps = {
  openModal, closeModal, enableReminderEmailTemplate,
  fetchTemplates: fetchAllEmailTemplates
};
ReminderSetup.propTypes = {
  fetchTemplates: PropTypes.func.isRequired,
  listEmailTemplatesReducer: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  shouldOpen: PropTypes.bool.isRequired,
  modalType: PropTypes.string,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  enableReminderTemplate: PropTypes.func,
};
const mapStateToProps = ({modal, listEmailTemplatesReducer}) => ({
  ...modal.modal,
  listEmailTemplatesReducer
});
export default connect(mapStateToProps, mapDispatchToProps)(ReminderSetup);
