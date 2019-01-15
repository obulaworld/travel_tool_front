import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';
import Modal from '../Modal';
import OtherDocument from '../../Forms/TravelReadinessForm/OtherDocumentForm';


const TravelDocumentModal = (props) => {
  const {
    closeModal,
    shouldOpen,
    modalType,
    createTravelReadinessDocument,
    travelReadinessDocuments,
    fetchUserData, 
    user,
  } = props;
  
  return (
    <Modal
      customModalStyles="add-document-item"
      closeModal={closeModal}
      width="580px"
      height="600px"
      visibility={
        shouldOpen && modalType === 'add other' ? 'visible' : 'invisible'
      }
      title="Add Document"
    >
      <OtherDocument
        closeModal={closeModal}
        createTravelReadinessDocument={createTravelReadinessDocument}
        travelReadinessDocuments={travelReadinessDocuments}
        documentType="other"
        fetchUserData={fetchUserData}
        user={user} 
      />
    </Modal>
  );
};
TravelDocumentModal.propTypes = {
  shouldOpen: PropTypes.bool.isRequired,
  modalType: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  createTravelReadinessDocument: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  travelReadinessDocuments: PropTypes.object.isRequired,
  fetchUserData: PropTypes.func.isRequired,

};
TravelDocumentModal.defaultProps = {
  modalType: ''
};
export default TravelDocumentModal;
