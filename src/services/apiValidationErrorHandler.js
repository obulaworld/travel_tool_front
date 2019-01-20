export default function apiValidationErrorHandler(error) {
  let errors = {};
  const { response: { data: { errors: validationErrors } } } = error;

  (validationErrors || []).forEach(error => {
    errors[error.name] = error.message;
  });

  return errors;
}
