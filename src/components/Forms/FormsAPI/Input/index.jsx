import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { HtmlInput, DropdownSelect, DateInput, ButtonToggler, NumberInput } from './InputFields';
import createEventHandlersFor from '../formEventHandlers';
import './_input.scss';

class Input extends PureComponent {

  getInputType() {
    let { name, type, onChange } = this.props;
    const { errors, targetForm, validatorName } = this.context;

    // get event handlers for the form in this context, for its input named 'name'
    const eventHandlers = createEventHandlersFor(targetForm, name, validatorName);

    if(type === 'text'){
      this.props = {
        ...this.props,
        onBlur: eventHandlers.handleInputBlur,
        onChange: onChange ||  eventHandlers.handleInputChange
      };
      return HtmlInput;
    } else if(type === 'number'){
      this.props = {
        ...this.props,
        onBlur: eventHandlers.handleInputBlur,
        onChange: onChange ||  eventHandlers.handleInputChange
      };
      return NumberInput;
    } 
    else { // explore other input options
      return this.switchInputWithProps(type, eventHandlers);
    }
  }

  switchInputWithProps = (type, eventHandlers) => {
    const { onChange, handleInputChange } = this.props;
    switch (type) {
    case 'button-toggler':
      // switches mutually exclusive options like a fancy set of radio buttons
      this.props = {
        ...this.props,
        onChange: onChange ||  eventHandlers.handleSelectTogglerOpt
      };
      return ButtonToggler;

    case 'date':
      this.props = { // save props for date type for use in render InputElement
        ...this.props,
        onChange: onChange || eventHandlers.handleSelectDate,
        onBlur: eventHandlers.handleInputBlur
      };
      return DateInput; // pick date Input

    case 'dropdown-select':
      this.props = {
        ...this.props,
        onChange: onChange || eventHandlers.handleSelectDropdown,
      };
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
    const { errors } = this.context;
    let { name, label, labelNote, className } = this.props;
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
        <InputElement error={errors[name]} {...this.props} />
        <span className="error">
          {errors[name]}
        </span>
      </div>
    );
  }
}

Input.contextTypes = {
  errors: PropTypes.object.isRequired,
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
