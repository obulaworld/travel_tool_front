import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputRenderer from '../../FormsAPI';
import * as formMetadata from '../../FormsMetadata/NewChecklistForm';

export default class ChecklistFieldSet extends Component {
  render() {
    this.inputRenderer = new InputRenderer(formMetadata);
    const { renderInput } = this.inputRenderer;
    const { handleCheckboxChange } = this.props;
    return (
      <fieldset className="add-checklist">
        <div className="input-group">
          <div style={{ width: '420px' }}>
            {renderInput('itemName', 'text')}
          </div>
          <div style={{ width: '200px' }}>
            {renderInput('label', 'text', {placeholder: 'Link label'})}
          </div>
          <div style={{ width:'200px', marginLeft:'20px' }}>
            {renderInput('link', 'text', {placeholder: 'Link address'})}
          </div>
          {renderInput('requiresFiles', 'checkbox')}
        </div>
      </fieldset>
    );
  }
}

ChecklistFieldSet.propTypes = {
  handleCheckboxChange: PropTypes.func
};

ChecklistFieldSet.defaultProps = {
  handleCheckboxChange: () => {}
};
