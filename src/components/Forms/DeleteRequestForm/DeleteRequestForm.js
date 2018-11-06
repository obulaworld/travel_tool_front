import React from 'react';
import { PropTypes } from 'prop-types';
import error from '../../../images/error.svg';
import Modal from '../../modal/Modal';
import SubmitArea from './FormFieldsets/SubmitArea';


const DeleteRequestForm = ({ closeModal, deleteChecklistItem, shouldOpen, modalType, handleInputChange }) => {
  return(
    <Modal
      closeModal={closeModal}
      customModalStyles="delete-checklist-item"
      visibility={
        shouldOpen && modalType.match('delete checklist item') ? 'visible' : 'invisible'
      }
      title="Delete Travel Checklist Item"
    >
      <p className="delete-checklist-item__reason">Reason</p>
      <textarea type="text" className="delete-checklist-item__input" onChange={handleInputChange} />
      <span className="delete-checklist-item__disclaimer">
        <img src={error} alt="profile" className="delete-checklist-item__disclaimer--error" />
            Are you sure you want to delete this Item?
      </span>
      <div className="delete-checklist-item__hr" />
      <SubmitArea
        onCancel={closeModal}
        hasBlankFields={false}
        deleteChecklistItem={deleteChecklistItem}
        send={
          modalType === 'delete checklist item' ? 'Delete' : 'Send Request'
        }
      />
    </Modal>
  );
};

DeleteRequestForm.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  deleteChecklistItem: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  modalType: PropTypes.string,
  shouldOpen: PropTypes.bool.isRequired
};

DeleteRequestForm.defaultProps = {
  modalType:''
};
export default DeleteRequestForm;
