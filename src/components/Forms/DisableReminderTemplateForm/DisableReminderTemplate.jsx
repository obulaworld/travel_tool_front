import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';
import Modal from '../../modal/Modal';
import SubmitArea from './FormFieldsets/SubmitArea';
import './DisableReminderTemplate.scss';


const renderTextArea = (conditionReason, handleInputChange) => {
  return (
    <Fragment>
      <textarea
        type="text"
        defaultValue={conditionReason}
        disabled={conditionReason ? true:false}
        className={conditionReason ? 'delete-checklist-item__input disabled':'delete-checklist-item__input'}
        onChange={handleInputChange}
      />
    </Fragment>
  );
};

const renderSubmitArea = (closeModal, disableEmailReminder, disableReason, conditionReason) => {
  return (
    <Fragment>
      <SubmitArea
        onCancel={closeModal}
        hasBlankFields={false}
        disableEmailReminder={disableEmailReminder}
        disableReason={disableReason}
        send="Disable"
        conditionReason={conditionReason}
      />
    </Fragment>
  );
};

const DisableReminderTemplateForm = ({
  closeModal, disableEmailReminder,
  shouldOpen, modalType, handleInputChange,
  disableReason, conditionReason, templateReason
}) => {
  return(
    <Modal
      closeModal={closeModal}
      customModalStyles="delete-checklist-item"
      visibility={
        shouldOpen && modalType.match('disable reminder condtion') ? 'visible' : 'invisible'
      }
      title={(conditionReason || templateReason) ? 'Disable Reason': 'Disable Reminder Condtion'}
    >
      { conditionReason ? <p className="delete-checklist-item__reason" /> : <p className="delete-checklist-item__reason">Reason for Disabling</p>}
      { renderTextArea(conditionReason, handleInputChange) }
      <div className="delete-checklist-item__hr" />
      { renderSubmitArea(closeModal, disableEmailReminder, disableReason, conditionReason) }
    </Modal>
  );
};

DisableReminderTemplateForm.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  disableEmailReminder: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  modalType: PropTypes.string,
  disableReason: PropTypes.string,
  conditionReason: PropTypes.string,
  templateReason: PropTypes.string,
  shouldOpen: PropTypes.bool.isRequired,
};

DisableReminderTemplateForm.defaultProps = {
  modalType:'',
  disableReason: '',
  conditionReason:'',
  templateReason: ''
};
export default DisableReminderTemplateForm;
