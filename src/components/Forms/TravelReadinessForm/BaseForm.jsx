import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import toast from 'toastr';
import axios from 'axios';
import {FormContext} from '../FormsAPI';
import './TravelDocument.scss';
import VisaFormFieldSet from './FormFieldsets/VisaFormFieldset';
import OtherDocumentFieldSet from './FormFieldsets/OtherDocumentFieldSet';
import FileUploadField from './FormFieldsets/FileUploadField';
import documentUpload from '../../../images/icons/document-upload-blue.svg';
import DocumentAPI from '../../../services/DocumentAPI';
import SubmitArea from '../NewDocumentForm/FormFieldSets/SubmitArea';

class BaseForm extends Component {
  constructor(props) {
    super(props);
    const { defaultFormState } = this.props;
    this.defaultState = defaultFormState;

    this.state = {...this.defaultState};
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { errors } = nextProps;
    this.setState({errors, isSubmitting: false});
  }

  componentWillUnmount() {
    const { fetchUserData, user } = this.props;
    fetchUserData(user.currentUser.userId);
  }

  onCancel = (event) => {
    event.preventDefault();
    const { closeModal } = this.props;
    closeModal();
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({isSubmitting: true, hasBlankFields: true });
    const { values, file } = this.state;
    const { createTravelReadinessDocument } = this.props;
    const formData = new FormData();
    if(file) {
      formData.append('file', file);
      formData.append('upload_preset', process.env.REACT_APP_PRESET_NAME);
      delete axios.defaults.headers.common['Authorization'];
      axios.post(process.env.REACT_APP_CLOUNDINARY_API, formData)
        .then((response) => {
          const url = response.data.url;
          DocumentAPI.setToken();
          const { documentType } = this.props;
          createTravelReadinessDocument(documentType, {...values, cloudinaryUrl:url});
        })
        .catch(() => {
          DocumentAPI.setToken();
          return toast.error('an error occurred try again');
        });
    }
    this.setState({isSubmitting: true});
  };


  handleUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      return toast.error('Invalid file type. Please upload an image');
    }
    if (file.size>Math.pow(10,7)) {
      return toast.error('File is too large');
    }
    const {  name } = file;
    this.setState({name, file});
  };
  
  renderSubmitButtonText() {
    const { documentType } = this.props;
    switch(documentType) {
    case 'visa': 
      return 'Visa';
    case 'other':
      return 'Document';
    default:
      return;
    }
  }

  render() {
    const {errors, values, hasBlankFields, isSubmitting, file, name } = this.state;
    const { documentType } = this.props;
    if (documentType === 'other') {
      delete errors.documentid;
    }
    return(
      <FormContext values={values} errors={errors} targetForm={this}>
        <form className="travel-document-form" onSubmit={this.handleSubmit}>
          {
            documentType === 'visa' &&  <VisaFormFieldSet />
          }
          {
            documentType === 'other' &&  <OtherDocumentFieldSet />
          }
          <div className="travel-document-select-file">
            <p>Attach File</p>
            <FileUploadField 
              name={name} 
              documentUpload={documentUpload} 
              handleUpload={this.handleUpload} 
            />
          </div>
          <hr />
          <div className="travel-document-submit-area">
            <SubmitArea 
              hasBlankFields={hasBlankFields || !file} 
              loading={isSubmitting} onCancel={this.onCancel} 
              addition={this.renderSubmitButtonText()} 
            />
          </div>
        </form>
      </FormContext>
    );
  }
}

BaseForm.propTypes = {
  errors: PropTypes.object.isRequired,
  createTravelReadinessDocument: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  fetchUserData: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  documentType: PropTypes.string.isRequired,
  defaultFormState: PropTypes.object.isRequired,
};
export default BaseForm;
