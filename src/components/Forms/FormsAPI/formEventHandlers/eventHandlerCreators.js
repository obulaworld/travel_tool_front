function updateFormValues(value, targetField, validate) {
  let { values } = { ...this.state };
  values = {
    ...values,
    [targetField]: value
  };

  validate = validate ? validate : () => {};

  this.setState({ values }, () => validate(targetField));
}

export function getInputChangeHandler(validate, targetField) {
  return e => {
    let value = e.target.value;
    updateFormValues.call(this, value, targetField, validate);
  };
}

export function getTogglerHandler(validate, targetField) {
  return opt => updateFormValues.call(this, opt, targetField, validate);
}

export function getDateHandler(validate, targetField) {
  return date =>
    updateFormValues.call(
      this,
      date.format('MM/DD/YYYY'),
      targetField,
      validate
    );
}

export function getDropdownHandler(validate, targetField) {
  return selectedOpt =>
    updateFormValues.call(this, selectedOpt, targetField, validate);
}

export function getOnBlurHandler(validate, targetField) {
  return () => validate.call(this, targetField);
}
