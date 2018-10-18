function updateFormValues(value, targetField, validate) {
  let { values } = { ...this.state };
  values = {
    ...values,
    [targetField]: value
  };
  validate = validate ? validate : () => {};
  this.setState({ values }, () => validate(targetField));
}

export function getInputChangeHandler(targetForm, validate, targetField) {
  return e => {
    let value = e.target.value;
    updateFormValues.call(targetForm, value, targetField, validate);
  };
}

export function getTogglerHandler(targetForm, validate, targetField) {
  return opt => updateFormValues.call(targetForm, opt, targetField, validate);
}

export function getDateHandler(targetForm, validate, targetField) {
  return date =>
    updateFormValues.call(
      targetForm,
      date.format('MM/DD/YYYY'),
      targetField,
      validate
    );
}

export function getDropdownHandler(targetForm, validate, targetField) {
  return selectedOpt =>
    updateFormValues.call(targetForm, selectedOpt, targetField, validate);
}

export function getOnBlurHandler(targetForm, validate, targetField) {
  return () => validate(targetField);
}
