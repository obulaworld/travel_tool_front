import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal/Modal';
import NewTravelReasonForm from '../Forms/NewTravelReasonForm';

const TravelReasonsModal = (props) => {
  const { shouldOpen, closeModal, modalType, createNewTravelReason, travelReason } = props;
  return (
    <Modal
      customModalStyles="modal--add-user"
      visibility={shouldOpen && modalType === 'create travel reasons' ? 'visible' : 'invisible'}
      title="Add Travel Reason"
      width="480px"
      closeModal={closeModal}
    >
      <NewTravelReasonForm
        onCancel={closeModal}
        hasBlankFields={false}
        closeModal={closeModal}
        send="Add Reason"
        createNewTravelReason={createNewTravelReason}
        travelReason={travelReason}
      />
    </Modal>
  );
};

TravelReasonsModal.propTypes = {
  shouldOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  modalType: PropTypes.string,
  createNewTravelReason: PropTypes.func,
  travelReason: PropTypes.object,
};

TravelReasonsModal.defaultProps = {
  closeModal: null,
  modalType: null,
  createNewTravelReason: null,
  travelReason: {},
  shouldOpen: false
};

export default TravelReasonsModal;

