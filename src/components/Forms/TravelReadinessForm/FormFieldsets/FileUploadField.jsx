import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { isEmpty } from 'lodash';

class FileUploadField extends Component{
  getUrlLink = (name) => {
    const { document, modalType } = this.props;
    if (!isEmpty(document) && (modalType.startsWith('edit')) && name === '') {
      return `${document.data && document.data.cloudinaryUrl.substring(0, 40)}...`;
    }
    return (
      name !== ''
        ? name.length > 50
          ? `${name.substring(0, 50)}...`
          : name
        : 'Drag file here or choose from computer'
    );
  };

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
              { this.getUrlLink(name)}
            </p>
          </div>
          <input type="file" onChange={handleUpload} id="select-file"  />
        </label>
      </div>
    );
  }
}

FileUploadField.propTypes = {
  name: Proptypes.string,
  documentUpload: Proptypes.string.isRequired,
  handleUpload: Proptypes.func.isRequired,
  document: Proptypes.object.isRequired,
  modalType: Proptypes.string.isRequired,
};

FileUploadField.defaultProps = {
  name: '',
};

export default FileUploadField;

