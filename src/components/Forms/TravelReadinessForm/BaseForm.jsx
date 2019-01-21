import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import toast from 'toastr';
import axios from 'axios';
import { isEmpty } from 'lodash';
import moment from 'moment';
import {FormContext} from '../FormsAPI';
import './TravelDocument.scss';
import VisaFormFieldSet from './FormFieldsets/VisaFormFieldset';
import OtherDocumentFieldSet from './FormFieldsets/OtherDocumentFieldSet';
import FileUploadField from './FormFieldsets/FileUploadField';
import documentUpload from '../../../images/icons/document-upload-blue.svg';
import DocumentAPI from '../../../services/DocumentAPI';
import SubmitArea from './FormFieldsets/SubmitArea';
import Preloader from '../../Preloader/Preloader';

class BaseForm extends Component {
  constructor(props) {
    super(props);
    const { defaultFormState } = this.props;
    this.defaultState = defaultFormState;
    this.state = {...this.defaultState};
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { errors, document } = nextProps;
    const { document: currentDocument } = this.props;
    if ((isEmpty(currentDocument) && !isEmpty(document)) && document.type === 'visa') {
      const { country, entryType, visaType, dateOfIssue, expiryDate, cloudinaryUrl } = document.data;
      this.newState = {
        values: {
          country, entryType, visaType,
          dateOfIssue: moment(dateOfIssue),
          expiryDate: moment(expiryDate)
        },
        id: document.id,
        image: cloudinaryUrl,
      };
      this.setState({errors, uploadingDocument: false, ...this.newState });
    } else if ((isEmpty(currentDocument) && !isEmpty(document)) && document.type === 'other') {
      const { name, dateOfIssue, expiryDate, documentId, cloudinaryUrl } = document.data;
      this.newState = {
        values: {
          name,
          dateOfIssue: dateOfIssue === '' ? '' : moment(dateOfIssue),
          expiryDate: moment(expiryDate),
          documentId
        },
        id: document.id,
        image: cloudinaryUrl,
      };
      this.setState({errors, uploadingDocument: false, ...this.newState });
    }
    this.setState({errors, uploadingDocument: false});
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

  handleSubmit = async (event) => {
    event.preventDefault();
    const {  values, image, errors, documentUploaded, id } = this.state;
    const { createTravelReadinessDocument, editTravelReadinessDocument, modalType, documentType } = this.props;
    const { dateOfIssue, expiryDate } = values;
    if(documentUploaded){

      const newValues = {
        ...values,
        dateOfIssue: dateOfIssue === '' ? '' : moment(dateOfIssue).format('YYYY/MM/DD'),
        expiryDate: moment(expiryDate).format('YYYY/MM/DD')
      };

      if (modalType === `edit ${documentType}`) {
        editTravelReadinessDocument(documentType, newValues, id);
      } else {
        createTravelReadinessDocument(documentType, newValues);
      }
    }else {
      if (image) {
        const fd = new FormData();
        fd.append('file', image);
        fd.append('upload_preset', process.env.REACT_APP_PRESET_NAME);

        try {
          delete axios.defaults.headers.common['Authorization'];
          this.setState({ uploadingDocument: true });
          const imageData = await axios.post(process.env.REACT_APP_CLOUNDINARY_API, fd);
          const {data: {url}} = imageData;
          this.setState({
            documentUploaded: true,
            uploadingDocument: false,
            values: {...values, cloudinaryUrl: url}
          });
          DocumentAPI.setToken();
          const documentValues = {
            ...values, 
            cloudinaryUrl: url,
            dateOfIssue: dateOfIssue === '' ? '' : moment(dateOfIssue).format('MM/DD/YYYY'),
            expiryDate: moment(expiryDate).format('MM/DD/YYYY')
          };

          if (modalType === `edit ${documentType}`) {
            editTravelReadinessDocument(documentType, { ...documentValues }, id);
          } else {
            createTravelReadinessDocument(documentType, { ...documentValues });
          }
        } catch (e) {
          toast.error('Error uploading passport. Please try again!');
        }
      } else {
        this.setState({errors: {...errors, cloudinaryUrl: 'Please upload a passport'}});
      }
    }
  };


  handleUpload = (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    if (!['image/jpeg', 'image/png'].includes(image.type)) {
      return toast.error('Invalid file type. Please upload an image');
    }
    if (image.size>Math.pow(10,7)) {
      return toast.error('File is too large');
    }
    const {  name } = image;
    this.setState({name, image, imageChanged: true});
  };

  render() {
    const {errors, values, hasBlankFields, uploadingDocument, name, imageChanged } = this.state;
    const { documentType, modalType, document, fetchingDocument } = this.props;
    if (documentType === 'other') delete errors.documentid;
    return(
      <div>
        {fetchingDocument ? <Preloader /> : (
          <FormContext values={values} errors={errors} targetForm={this}>
            <form className="travel-document-form" onSubmit={this.handleSubmit}>
              { documentType === 'visa' &&  <VisaFormFieldSet /> }
              { documentType === 'other' &&  <OtherDocumentFieldSet /> }
              <div className="travel-document-select-file">
                <p>Attach File</p>
                <FileUploadField 
                  name={name}
                  documentUpload={documentUpload} 
                  handleUpload={this.handleUpload}
                  document={document}
                  modalType={modalType}
                />
              </div>
              <hr />
              <div className="travel-document-submit-area">
                <SubmitArea
                  onCancel={this.onCancel} hasBlankFields={hasBlankFields && !imageChanged} 
                  send={
                    (modalType === 'edit other' || modalType === 'edit visa') ? 'Save Changes' : 
                      (modalType === 'add other' ? 'Add Document' : 'Add Visa')}
                  loading={uploadingDocument} />
              </div>
            </form>
          </FormContext>)}
      </div>
    );
  }
}

BaseForm.propTypes = {
  errors: PropTypes.object,
  createTravelReadinessDocument: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  fetchUserData: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  documentType: PropTypes.string.isRequired,
  defaultFormState: PropTypes.object,
  editTravelReadinessDocument: PropTypes.func,
  document: PropTypes.object,
  modalType: PropTypes.string, fetchingDocument: PropTypes.bool
};

BaseForm.defaultProps = {
  editTravelReadinessDocument: () => {},
  document: {},
  modalType: '',
  errors: {},
  defaultFormState: {},
  fetchingDocument: false
};
export default BaseForm;
