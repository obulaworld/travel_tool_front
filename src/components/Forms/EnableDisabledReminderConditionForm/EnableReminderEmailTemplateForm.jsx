import React from 'react';
import { PropTypes } from 'prop-types';
import Modal from '../../modal/Modal';
import SubmitArea from './FormFieldsets/SubmitArea';

const EnableDisabledReminderConditionForm = ({
  closeModal, enableDisabledReminderCondition, shouldOpen, modalType
}) => {
  return(
    <Modal
      closeModal={closeModal}
      customModalStyles="add-checklist-item delete-document"
      width="480px"
      visibility={
        shouldOpen && modalType.match('enable disabled reminder') ? 'visible' : 'invisible'
      }
      title="Enable Reminder Condition"
    >
      <p className="delete-checklist-item__reason">Are you sure you want to enable the reminder?</p>
      <div className="delete-checklist-item__hr" />
      <SubmitArea
        onCancel={closeModal}
        hasBlankFields={false}
        enableDisabledReminderCondition={enableDisabledReminderCondition}
        send="Enable"
      />
    </Modal>
  );
};

EnableDisabledReminderConditionForm.propTypes = {
  enableDisabledReminderCondition: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  modalType: PropTypes.string,
  shouldOpen: PropTypes.bool.isRequired
};

EnableDisabledReminderConditionForm.defaultProps = {
  modalType: ''
};
export default EnableDisabledReminderConditionForm;
