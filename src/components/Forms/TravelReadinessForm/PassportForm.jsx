import React, { PureComponent } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import axios from 'axios';
import toast from 'toastr';
import { isEmpty } from 'lodash';
import DocumentAPI from '../../../services/DocumentAPI';
import { FormContext, getDefaultBlanksValidatorFor } from '../FormsAPI';
import PassportDetails from'./FormFieldsets/passportDetails';
import './TravelReadiness.scss';
import SubmitArea from './FormFieldsets/SubmitArea';
import Preloader from '../../Preloader/Preloader';

class PassportForm extends PureComponent {
  constructor(props) {
    super(props);
    this.defaultState = {
      values: {
        name: '',
        passportNumber: '',
        nationality:'',
        dateOfBirth: '',
        dateOfIssue: '',
        placeOfIssue: '',
        expiryDate: ''
      },
      image: '',
      documentUploaded: false,
      uploadingDocument: false,
      errors: {},
      hasBlankFields: true,
    };
    this.state = {...this.defaultState};
  }


  componentWillReceiveProps(nextProps, nextContext) {
    const { errors, document } = nextProps;
    const { document: currentDocument } = this.props;
    if (isEmpty(currentDocument) && !isEmpty(document)) {
      const { passportNumber, name, nationality, dateOfBirth, dateOfIssue, placeOfIssue, expiryDate, cloudinaryUrl } = document.data;
      this.newState = {
        values: {
          name: name,
          passportNumber,
          nationality,
          dateOfBirth: moment(dateOfBirth),
          dateOfIssue: moment(dateOfIssue),
          placeOfIssue,
          expiryDate: moment(expiryDate)
        },
        id: document.id,
        image: cloudinaryUrl,
        imageChanged: false,
      };
      this.setState({errors, ...this.newState });
    }
    this.setState({ errors });
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

  handleSubmit = async event => {
    event.preventDefault();
    const { values, image, errors, documentUploaded, id } = this.state;
    const { createTravelReadinessDocument, editTravelReadinessDocument, modalType } = this.props;
    const { dateOfBirth, dateOfIssue, expiryDate } = values;

    if( documentUploaded){

      const newValues = {
        ...values,
        dateOfBirth: moment(dateOfBirth).format('YYYY/MM/DD'),
        dateOfIssue:moment(dateOfIssue).format('YYYY/MM/DD'),
        expiryDate: moment(expiryDate).format('YYYY/MM/DD')
      };

      if (modalType === 'edit passport') {
        editTravelReadinessDocument('passport', newValues, id);
      } else {
        createTravelReadinessDocument('passport', newValues);
      }
    }else {
      if (image) {
        const fd = new FormData();
        fd.append('file', image);
        fd.append('upload_preset', process.env.REACT_APP_PRESET_NAME);

        try {
          delete axios.defaults.headers.common['Authorization'];
          this.setState({uploadingDocument: true});
          const imageData = await axios.post(process.env.REACT_APP_CLOUNDINARY_API, fd);
          const {data: {url}} = imageData;
          this.setState({
            documentUploaded: true,
            uploadingDocument: false,
            values: {...values, cloudinaryUrl: url}
          });
          DocumentAPI.setToken();
          const passportValues = {
            ...values, 
            cloudinaryUrl: url,
            dateOfBirth: moment(dateOfBirth).format('YYYY/MM/DD'),
            dateOfIssue:moment(dateOfIssue).format('YYYY/MM/DD'),
            expiryDate: moment(expiryDate).format('YYYY/MM/DD')
          };

          if (modalType === 'edit passport') {
            editTravelReadinessDocument('passport',{ ...passportValues }, id);
          } else {
            createTravelReadinessDocument('passport',{ ...passportValues });
          }
        } catch (e) {
          toast.error('Error uploading passport. Please try again!');
        }
      } else {
        this.setState({errors: {...errors, cloudinaryUrl: 'Please upload a passport'}});
      }
    }
  };

  handleUpload=(e) => {
    const { errors } = this.state;
    const file = e.target.files[0];
    const tenMBS = Math.pow(10,7);
    if (file.size > tenMBS){
      return toast.error('Incorrect file size uploaded');
    }
    this.setState({
      image: e.target.files[0],
      imageChanged: true,
      documentUploaded: false,
      errors: { ...errors, cloudinaryUrl: ''}});
  };

  render() {
    const {errors, values, hasBlankFields,uploadingDocument, imageChanged } = this.state;
    const { document, modalType, fetchingDocument } = this.props;
    return (
      <div>
        {fetchingDocument ? <Preloader /> : (
          <FormContext
            targetForm={this}
            errors={errors}
            validatorName="myCustomValidator" // uses FormAPI's default validator if this is undefined
            values={values}>
            <form className="passport-form" onSubmit={this.handleSubmit}>
              <PassportDetails 
                handleUpload={this.handleUpload} 
                errors={errors} 
                document={document}
                modalType={modalType}
              />
              <SubmitArea
                onCancel={this.onCancel} hasBlankFields={hasBlankFields && !imageChanged}
                send={modalType === 'edit passport' ? 'Save Changes' : 'Add Passport'}
                loading={uploadingDocument} />
            </form>
          </FormContext>)}
      </div>
    );
  }

}

PassportForm.propTypes = {
  createTravelReadinessDocument: PropTypes.func.isRequired,
  errors: PropTypes.shape({}).isRequired,
  fetchUserData: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
  editTravelReadinessDocument: PropTypes.func,
  document: PropTypes.object.isRequired,
  modalType: PropTypes.string,
  fetchingDocument: PropTypes.bool
};

PassportForm.defaultProps = {
  editTravelReadinessDocument: () => {},
  modalType: '',
  fetchingDocument: false
};

export default PassportForm;
