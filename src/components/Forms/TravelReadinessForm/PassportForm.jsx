import React, { PureComponent } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import axios from 'axios';
import toast from 'toastr';
import DocumentAPI from '../../../services/DocumentAPI';
import { FormContext, getDefaultBlanksValidatorFor } from '../FormsAPI';
import PassportDetails from'./FormFieldsets/passportDetails';
import './TravelReadiness.scss';
import SubmitArea from './FormFieldsets/SubmitArea';

class PassportForm extends PureComponent{
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
    const { errors } = nextProps;
    this.setState({ errors});
  }

  componentWillUnmount() {
    const { fetchUserData, user } = this.props;
    fetchUserData(user.currentUser.userId);
  }


  handleSubmit = async event => {
    event.preventDefault();
    const { values, image, errors, documentUploaded } = this.state;
    const {createTravelReadinessDocument} = this.props;
    const {dateOfBirth, dateOfIssue, expiryDate} = values;

    if( documentUploaded){

      const newValues = {
        ...values,
        dateOfBirth: moment(dateOfBirth).format('YYYY/MM/DD'),
        dateOfIssue:moment(dateOfIssue).format('YYYY/MM/DD'),
        expiryDate: moment(expiryDate).format('YYYY/MM/DD')
      };


      createTravelReadinessDocument('passport', newValues);
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
            values: {...values, cloudinaryUrl: url}});

          DocumentAPI.setToken();
          createTravelReadinessDocument('passport',{...values, cloudinaryUrl: url,
            dateOfBirth: moment(dateOfBirth).format('YYYY/MM/DD'),
            dateOfIssue:moment(dateOfIssue).format('YYYY/MM/DD'),
            expiryDate: moment(expiryDate).format('YYYY/MM/DD')});
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
      documentUploaded: false,
      errors: { ...errors, cloudinaryUrl: ''}});
  };

  render() {
    const {errors, values, hasBlankFields,uploadingDocument } = this.state;
    return (
      <div>
        <FormContext
          targetForm={this}
          errors={errors}
          validatorName="myCustomValidator" // uses FormAPI's default validator if this is undefined
          values={values}>
          <form className="passport-form" onSubmit={this.handleSubmit}>
            <PassportDetails handleUpload={this.handleUpload} errors={errors} />
            <SubmitArea
              onCancel={this.onCancel} hasBlankFields={hasBlankFields} send="Add Passport"
              loading={uploadingDocument} />
          </form>
        </FormContext>
      </div>
    );
  }

}

PassportForm.propTypes = {
  createTravelReadinessDocument: PropTypes.func.isRequired,
  errors: PropTypes.shape({}).isRequired,
  fetchUserData: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};
export default PassportForm;
