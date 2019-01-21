import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import BaseForm from './BaseForm';

class OtherDocumentForm extends Component{
  constructor(props) {
    super(props);
    this.defaultState = {
      values: {
        name: '',
        dateOfIssue: '',
        expiryDate: '',
      },
      image: '',
      imageChanged: false,
      documentUploaded: false,
      uploadingDocument: false,
      errors: {},
      hasBlankFields: true,
      optionalFields: [
        'documentId',
        'dateOfIssue'
      ]
    };
    this.state = {...this.defaultState};
  }

  render() {
    const { 
      fetchUserData, 
      user,closeModal, 
      createTravelReadinessDocument,
      editTravelReadinessDocument,
      travelReadinessDocuments,
      document,
      currentDocument,
      modalType
    } = this.props;
    const { errors } = this.state;
    return (
      <BaseForm
        fetchUserData={fetchUserData}
        user={user}
        errors={errors}
        defaultFormState={this.state}
        documentType="other"
        {...travelReadinessDocuments}
        closeModal={closeModal}
        createTravelReadinessDocument={createTravelReadinessDocument}
        editTravelReadinessDocument={editTravelReadinessDocument}
        currentDocument={currentDocument}
        modalType={modalType}
        document={document}
      />
    );
  }
}

OtherDocumentForm.propTypes = {
  createTravelReadinessDocument: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  fetchUserData: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired,
  editTravelReadinessDocument: PropTypes.func,
  document: PropTypes.object,
  modalType: PropTypes.string,
};

OtherDocumentForm.defaultProps = {
  editTravelReadinessDocument: () => {},
  document: {},
  modalType: ''
};

export default OtherDocumentForm;
