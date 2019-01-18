import React, { PureComponent } from 'react';
import {PropTypes} from 'prop-types';
import moment from 'moment';
import './TravelDocument.scss';
import BaseForm from './BaseForm';

class AddVisaForm extends PureComponent {
  constructor(props) {
    super(props);
    this.defaultState = {
      values: {
        country: '',
        entryType: '',
        dateOfIssue: '',
        expiryDate: '',
        visaType:''
      },
      image: '',
      imageChanged: false,
      documentUploaded: false,
      uploadingDocument: false,
      errors: {},
      hasBlankFields: true,
    };
    this.state = {...this.defaultState};
  }

  render() {
    const {
      fetchUserData,user,closeModal,
      createTravelReadinessDocument,
      editTravelReadinessDocument,
      travelReadinessDocuments,
      document,
      currentDocument,
      modalType,
      errors
    } = this.props;

    return (
      <BaseForm
        fetchUserData={fetchUserData}
        user={user}
        errors={errors}
        defaultFormState={this.state}
        documentType="visa"
        {...travelReadinessDocuments}
        closeModal={closeModal}
        createTravelReadinessDocument={createTravelReadinessDocument}
        editTravelReadinessDocument={editTravelReadinessDocument}
        currentDocument={currentDocument}
        document={document}
        modalType={modalType}
      />
    );
  }
}

AddVisaForm.propTypes = {
  createTravelReadinessDocument: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  fetchUserData: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  editTravelReadinessDocument: PropTypes.func,
  document: PropTypes.object,
  modalType: PropTypes.string,
};

AddVisaForm.defaultProps = {
  editTravelReadinessDocument: () => {},
  document: {},
  modalType: ''
};
export default AddVisaForm;
