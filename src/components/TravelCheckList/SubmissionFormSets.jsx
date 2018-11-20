import React, { Component } from 'react';
import axios from 'axios';
import { PropTypes } from 'prop-types';
import uploadIcon from '../../images/uploadIcon.svg';
import check from '../../images/check.svg';
import saveIcon from '../../images/saveIcon.svg';
import withLoading from '../Hoc/withLoading';

class SubmissionFormSets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadSuccess: null,
      uploadPresent: false,
    };}

  componentWillReceiveProps(someProps){
    const { submissionInfo, item } = someProps;
    const { postSuccess } = submissionInfo;
    if (submissionInfo.submissions.length > 0) {
      const submission = this.findSubmission(submissionInfo.submissions, item);
      if (submission) {this.setState({ uploadPresent: true });}
    }
    if(postSuccess !== ''){
      setTimeout(() => {
        this.setState(
          { uploadSuccess: null
          });}, 2000);
    }
  }

  handleSubmit = (data) => {
    const { postSubmission } = this.props;
    postSubmission(data);
  };

  findTripId = () => {
    const { destination, trips, } = this.props;
    let newTrip;
    trips.forEach((trip)=>{
      if(trip.destination === destination){
        newTrip = trip;
      }
    });
    return newTrip;
  };

  handleBlur = (e) => {
    e.preventDefault();
    const { item, } = this.props;
    const tripId = this.findTripId().id;
    const data = {
      [e.target.name]: e.target.value};
    const formData = {
      file: null,
      submissionId: null,
      tripId,
      isUpload: false,
      data,
      label: e.target.name
    };
    const finalData = {
      formData, checklistId: item.id
    };
    this.setState({ uploadSuccess: 'start' });
    this.handleSubmit(finalData);
  };

  handleDownLoad = async (e) =>{
    e.preventDefault();
    const { submissionInfo, item } = this.props;
    const submission = this.findSubmission(submissionInfo.submissions, item);
    const value = JSON.parse(submission.value);
    const fileType = value.fileName.split('.')[1];
    const fileUrl = value.secureUrl;
    delete axios.defaults.headers.common['Authorization'];
    const fileData = await axios.get(fileUrl);
    const file = new Blob([fileData.data], {type: fileType});
    if (window.navigator.msSaveOrOpenBlob) // handles IE10+
      window.navigator.msSaveOrOpenBlob(file, value.fileName);
    else { // handles others Others
      let fileElement = document.createElement('a'),
        url = URL.createObjectURL(file);
      fileElement.href = url;
      fileElement.download = value.fileName;
      document.body.appendChild(fileElement);
      fileElement.click();
      setTimeout(function() {
        document.body.removeChild(fileElement);
        window.URL.revokeObjectURL(url);
      }, 0);
    }
  };

  handleUpload = (e) => {
    e.preventDefault();
    const { item, } = this.props;
    const tripId = this.findTripId().id;
    const fileName = e.target.files[0].name;
    const label = e.target.name;
    const file = new FileReader();
    this.setState({ uploadSuccess:'start', tempFileName: fileName });
    file.readAsDataURL(e.target.files[0]);
    file.onload = (e) => {
      const formData = {
        file: e.target.result,
        submissionId:null,
        tripId,
        isUpload: true,
        data:null,
        fileName,
        label
      };
      const data = {
        formData,
        checklistId: item.id
      };
      this.handleSubmit(data);
    };
  };

  findSubmission = (submissions, item) => {
    let finalSubmission;
    const tripId = this.findTripId().id;
    if (submissions !== '') {
      submissions.forEach(
        submission => {
          const itemId = item.id;
          const checklistId = submission.checklistItemId;
          const checklistripId = submission.tripId;
          if (itemId === checklistId && checklistripId === tripId)
          {finalSubmission = submission;}
        }
      );}
    return finalSubmission;
  };

  renderTextInput = () => {
    const { item, submissionInfo, isLoading } = this.props;
    const { uploadSuccess } = this.state;
    const { id } = item;
    const submission = this.findSubmission(submissionInfo.submissions, item);
    let placeholder, value, valueKeyList, visible;
    const name = item.name;
    if(submission){
      value = JSON.parse(submission.value);
      valueKeyList = Object.keys(value);
      placeholder = value[valueKeyList[0]];
    }
    const holder = placeholder || '  input information here...';
    visible = value === undefined ? '__hidden' : '' ;
    return (
      <div>
        <div className="travelCheckList--item__item__textarea">
          <div>
            <textarea
              placeholder={holder}
              name={name}
              rows="4"
              cols="80"
              type="submit"
              className="" disabled={false} defaultValue={holder} readOnly={false} onBlur={this.handleBlur} />
            <img src={check} alt="check_icon" className={`travelCheckList--input__check-image__text${visible}`} />
          </div>
          {uploadSuccess === 'start' && (<div className="progress-bar text">Uploading content... </div>)}
        </div>
      </div>
    );
  };

  renderUploadField = () => {
    const { uploadSuccess, uploadPresent } = this.state;
    return(
      uploadPresent?this.renderDownloadField():(
        <div>
          <div className="travelCheckList--input__input-field">
            <div role="presentation" className="travelCheckList--input__btn">
              <img src={uploadIcon} alt="upload_icon" className="travelCheckList--input__image" />
              <span id="file-upload" role="presentation">Upload file</span>
            </div>
            <input type="file" name="file" onChange={this.handleUpload} />
            { uploadSuccess==='done' ? (<div className="progress-bar success">Done</div>):
              uploadSuccess=== 'start' ? (<div className="progress-bar file">Uploading file...</div>) : null}
          </div>
        </div>
      ));
  };
  renderDownloadField = () => {
    const { submissionInfo, item, requestData } = this.props;
    const { tempFileName } = this.state;
    const submission = this.findSubmission(submissionInfo.submissions, item);
    let value, fileName, visible;
    if(submission){
      value = JSON.parse(submission.value);
      fileName = value ? value.fileName : tempFileName;
      visible = fileName === undefined ? 'hidden' : '';
    }
    return(
      <div className="travelCheckList--input__download-field">
        <div role="presentation" className="travelCheckList--input__upload">
          <span id="file-name" role="presentation">{fileName||'Loading file...'}</span>
          <img src={saveIcon} alt="save_icon" className={`travelCheckList--input__image ${visible}`} />
          <img src={check} alt="check_icon" className="travelCheckList--input__check-image" />
          <input id={`download-file${'__'+visible}`} type="button" name="button" onClick={this.handleDownLoad} />
        </div>
      </div>
    );
  };

  renderField = () => {
    const { item } = this.props;
    return (
      !item.requiresFiles && this.renderTextInput() || this.renderUploadField());
  };
  render(){
    const { item } = this.props;
    const { resources, name } = item;
    let { label } = resources[0] || false;
    label = label ? `(${label})` : '';
    return (
      <div key={item.id}>
        <div className="travelCheckList--item__item">
          <div className="travelCheckList--item__input-label">
            <label htmlFor={name}>
              <p className="travelCheckList--item__visa-application">
                {name}
                {
                  resources.length > 0 && resources.map(resource => (
                    <a
                      key={item.id}
                      href={resource.link}
                      className="travelCheckList--item__visa-application-gu"
                    >
                      {resource.label ? `(${resource.label})` : ''}
                    </a>
                  ))
                }
              </p>
            </label>
          </div>
          {this.renderField()}
        </div>
      </div>
    );
  }
}

SubmissionFormSets.propTypes = {
  item: PropTypes.object.isRequired,
  submissionInfo: PropTypes.object.isRequired,
  destination: PropTypes.string.isRequired,
  trips: PropTypes.array.isRequired,
  requestData: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  postSubmission: PropTypes.func.isRequired,
};

export default withLoading(SubmissionFormSets);
