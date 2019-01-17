import React, { PureComponent } from 'react';
import {PropTypes} from 'prop-types';
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
      errors: {},
      hasBlankFields: true,
      isSubmitting: false,
      uploadProgress: 0,
      cloudinaryUrl: ''
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
        documentType="visa"
        {...travelReadinessDocuments}
        closeModal={closeModal}
        createTravelReadinessDocument={createTravelReadinessDocument}
      />
    );
  }
}

AddVisaForm.propTypes = {
  createTravelReadinessDocument: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  fetchUserData: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default AddVisaForm;
