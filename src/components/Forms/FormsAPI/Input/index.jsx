import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import {
  HtmlInput,
  DropdownSelect,
  DateInput,
  ButtonToggler,
  NumberInput,
  filterDropdownSelect,
  CheckBox
} from './InputFields';
import createEventHandlersFor from '../formEventHandlers';
import './_input.scss';

class Input extends PureComponent {

  getInputType() {
    let { name, type, onChange } = this.props;
    const { errors, targetForm, validatorName } = this.context;
    // get event handlers for the form in this context, for its input named 'name'
    const eventHandlers = createEventHandlersFor(targetForm, name, validatorName);
    return this.switchTypeWithProps(type, eventHandlers);
  }

  switchTypeWithProps = (type, eventHandlers) => {
    const { onChange, handleInputChange } = this.props;
    switch (type) {
    case 'button-toggler':
      this.props = {
        ...this.props,
        onChange: onChange ||  eventHandlers.handleSelectTogglerOpt
      };
      return ButtonToggler;
    case 'date':
      this.props = {
        ...this.props,
        onChange: onChange || eventHandlers.handleSelectDate,
        onBlur: eventHandlers.handleInputBlur
      };
      return DateInput;
    case 'dropdown-select':
    case 'filter-dropdown-select':
      this.props = {
        ...this.props,
        onChange: onChange || eventHandlers.handleSelectDropdown,
      };
      return this.switchDropdownInputTypes(type);
    case 'checkbox':
      this.props = {
        ...this.props,
        onChange: onChange || eventHandlers.handleCheckBoxChange
      };
      return CheckBox;
    default:
      this.props = {
        ...this.props,
        onBlur: eventHandlers.handleInputBlur,
        onChange: onChange ||  eventHandlers.handleInputChange
      };
      return this.switchTextBasedInputTypes(type);
    }
  }

  switchTextBasedInputTypes(type) {
    switch (type) {
    case 'text':
    case 'password':
    case 'email':
      return HtmlInput;
    case 'number':
      return NumberInput;
    }
  }

  switchDropdownInputTypes(type) {
    switch (type) {
    case 'filter-dropdown-select':
      return filterDropdownSelect;
    default:
      return DropdownSelect;
    }
  }

  labelNote(note) { // a small message tied to an inputs label
    return note ? (
      <span>
        &nbsp;
        { note }
      </span>
    ) : null;
  }

  render() {
    const { errors, values } = this.context;
    let { name, label, labelNote, className } = this.props;
    const value = values? values[name]: '';
    const error = errors? errors[name]: '';
    let customClass = className ? className : '';
    // switch input types into InputElement
    const InputElement = this.getInputType();

    return (
      <div
        className={`form-input ${customClass} ${errors[name] ? 'error' : ''}`}
      >
        <label htmlFor={name}>
          {label}
          <span style={{color: 'red'}}>
            *
          </span>
          {this.labelNote(labelNote)}
        </label>
        <InputElement value={value} error={error} {...this.props} />
        <span className="error">
          {error}
        </span>
      </div>
    );
  }
}

Input.contextTypes = {
  errors: PropTypes.object.isRequired,
  values: PropTypes.object,
  targetForm: PropTypes.object.isRequired,
  validatorName: PropTypes.string
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.oneOfType([
    PropTypes.func, PropTypes.object
  ]).isRequired,
  labelNote: PropTypes.string,
  className: PropTypes.string,
};

Input.defaultProps = {
  labelNote: '',
  className: ''
};

export default Input;
