import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import toast from 'toastr';
import axios from 'axios';
import {FormContext} from '../FormsAPI';
import './AddVisa.scss';
import VisaFormFieldSet from './FormFieldsets/VisaFormFieldset';
import documentUpload from '../../../images/icons/document-upload-blue.svg';
import DocumentAPI from '../../../services/DocumentAPI';
import SubmitArea from '../NewDocumentForm/FormFieldSets/SubmitArea';

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
          createTravelReadinessDocument('visa', {...values, cloudinaryUrl:url});
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

  renderFileSelection = (name) => (
    <div className="document-input__input-container">
      <label className="document-input__input-container__prompts" htmlFor="select-file">
        <img
          src={documentUpload}
          alt="Document Upload" className="document-input__input-container__prompts__img" />
        <div className="document-input__input-container__prompts__text">
          <p>
            { name || 'Drag file here or choose from computer'}
          </p>
        </div>
        <input type="file" onChange={this.handleUpload} id="select-file" />
      </label>
    </div>
  );

  render() {
    const {errors, values, hasBlankFields, isSubmitting, file, name } = this.state;
    return(
      <FormContext values={values} errors={errors} targetForm={this}>
        <form className="visa-form" onSubmit={this.handleSubmit}>
          <VisaFormFieldSet />
          <div className="visa-select-file">
            <p>Attach File</p>
            {this.renderFileSelection(name)}
          </div>
          <hr />
          <div className="visa-submit-area">
            <SubmitArea hasBlankFields={hasBlankFields || !file} loading={isSubmitting} onCancel={this.onCancel} addition="Visa" />
          </div>
        </form>
      </FormContext>
    );
  }
}

AddVisaForm.propTypes = {
  errors: PropTypes.object.isRequired,
  createTravelReadinessDocument: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  fetchUserData: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default AddVisaForm;
