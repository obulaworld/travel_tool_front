import React from 'react';
import { PropTypes } from 'prop-types';
import Modal from '../../modal/Modal';
import SubmitArea from './FormFieldsets/SubmitArea';


const EnableEmailReminderTemplateForm = ({ 
  closeModal, enableReminderTemplate, shouldOpen, modalType
}) => {
  return(
    <Modal
      closeModal={closeModal}
      customModalStyles="add-checklist-item delete-document"
      width="480px"
      visibility={
        shouldOpen && modalType.match('enable reminder template') ? 'visible' : 'invisible'
      }
      title="Enable Email Reminder Template"
    >
      <p className="delete-checklist-item__reason">Are you sure you want to enable the template?</p>
      <div className="delete-checklist-item__hr" />
      <SubmitArea
        onCancel={closeModal}
        hasBlankFields={false}
        enableEmailReminderTemplate={enableReminderTemplate} 
        send="Enable"
      />
    </Modal>
  );
};

EnableEmailReminderTemplateForm.propTypes = {
  enableReminderTemplate: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  modalType: PropTypes.string,
  shouldOpen: PropTypes.bool.isRequired,
};

EnableEmailReminderTemplateForm.defaultProps = {
  modalType:'',
};
export default EnableEmailReminderTemplateForm;
