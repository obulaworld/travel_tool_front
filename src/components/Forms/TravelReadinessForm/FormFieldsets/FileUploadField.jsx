import React, { Component } from 'react';
import Proptypes from 'prop-types';

class FileUploadField extends Component{
  render(){
    const { name, documentUpload, handleUpload } = this.props;
    return  ( 
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
          <input type="file" onChange={handleUpload} id="select-file" />
        </label>
      </div>
    );
  }
}

FileUploadField.propTypes = {
  name: Proptypes.string,
  documentUpload: Proptypes.string.isRequired,
  handleUpload: Proptypes.func.isRequired,
};

FileUploadField.defaultProps = {
  name: '',
};

export default FileUploadField;

