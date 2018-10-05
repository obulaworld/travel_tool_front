import React, {Component} from 'react';
import Input from './Input';
import FormContext from './FormContext/FormContext';

class InputRenderer {
  constructor(props, formMetadata) {
    this.formMetadata = formMetadata;
    this.props = props;
  }

  switchProps(name, type, values, inputProps) {
    switch (type) {
    case 'dropdown-select':
      inputProps.choices = this.formMetadata.dropdownSelectOptions[name.split('-')[0]];
      return inputProps;
    case 'button-toggler':
      inputProps.choices = this.formMetadata.buttonToggleOptions[name];
      return inputProps;
    case 'date':
      inputProps.selectedDate = values[name];
      return inputProps;
    default:
      return inputProps;
    }
  }

  renderInput = (name, type, customProps, editValue) => {
    const { values, onChange, value, handleInputChange} = this.props;
    let inputProps = {
      defaultValue: editValue,
      value: values[name],
      name: name,
      type: type,
      size: value,
      label: this.formMetadata.inputLabels[name.split('-')[0]].label,
      labelNote: this.formMetadata.inputLabels[name.split('-')[0]].note,
      onChange: onChange,
      handleInputChange: handleInputChange,
      ...customProps,
    };

    customProps ? inputProps['data-parentid'] = customProps.parentid : null;
    inputProps = this.switchProps(name, type, values, inputProps);
    return createInput(inputProps);
  }
}

const createInput = props => <Input {...props} />;

export {Input, FormContext};
export default InputRenderer;
