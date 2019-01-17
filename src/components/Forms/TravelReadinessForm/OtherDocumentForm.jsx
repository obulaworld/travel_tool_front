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
      errors: {},
      hasBlankFields: true,
      isSubmitting: false,
      uploadProgress: 0,
      cloudinaryUrl: '',
      optionalFields: [
        'documentId'
      ]
    };
    this.state = {...this.defaultState};
  }

  render() {
    const {
      fetchUserData,user,closeModal,
      createTravelReadinessDocument,
      travelReadinessDocuments
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
};

export default OtherDocumentForm;
