import React, { Component } from 'react';
import PropTypes from 'prop-types';
import toast from 'toastr';
import InputRenderer from '../../FormsAPI';
import formMetadata from '../../FormsMetadata/TravelReadinessFormMetadata/passportInputLabels';
import documentUpload from '../../../../images/icons/document-upload-blue.svg';

class PassportDetailsFieldSet extends Component{

  state = {
    fileName: ''
  };

  handleUpload=(e)=> {
    const { handleUpload } = this.props;
    handleUpload(e);
    const fileName = e.target.files[0].name;
    this.setState({fileName});
  };

  renderFileSelection = (fileName) => (
    <div className="document-input__input-container">
      <label className="document-input__input-container__prompts" htmlFor="select-file">
        <img
          src={documentUpload}
          alt="Document Upload" className="document-input__input-container__prompts__img" />
        <div className="document-input__input-container__prompts__text">
          <p>
            { fileName || 'Drag file here or '}
            { !fileName && <span>choose from computer</span>}
          </p>
        </div>
        <input
          type="file" onChange={this.handleUpload} id="select-file"
          accept="image/*, .pdf" />
      </label>
    </div>
  );

  renderFields = () => {
    const { renderInput } = new InputRenderer({inputLabels: formMetadata });
    const { fileName } = this.state;
    const { errors : { cloudinaryUrl} } = this.props;
    return(
      <fieldset>
        <div className="input-group">
          {renderInput('name', 'text', {className: 'fluid'})}
          {renderInput('passportNumber', 'text')}
          {renderInput('nationality', 'text')}
          {renderInput('dateOfBirth', 'date')}
          {renderInput('dateOfIssue', 'date')}
          {renderInput('placeOfIssue', 'text')}
          {renderInput('expiryDate', 'date')}
        </div>
        <div className="attach-file">
          <p>
            Attach File
            <span style={{color: 'red'}}>
            *
            </span>
          </p>
          {this.renderFileSelection(fileName)}
          { <span className="error">{cloudinaryUrl}</span>}
        </div>
        <hr />
      </fieldset>
    );
  };

  render() {
    return (
      <div>{this.renderFields()}</div>
    );
  }

}

PassportDetailsFieldSet.propTypes = {
  handleUpload: PropTypes.func.isRequired,
  errors: PropTypes.shape({}).isRequired
};

export default PassportDetailsFieldSet;
