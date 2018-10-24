export default function apiErrorHandler(error) {
  let errorMessage;
  let validationErrors;
  // if server gets an error response, handle it
  if (error.response) {
    /**
     * using a switch statement instead of if/else because there is
     * a chance that we have to handle other error codes when we make
     * requests like GET to the server
     */
    switch (error.response.status) {
    case 500:
      errorMessage = 'Server error, try again';
      break;
    case 422:
      errorMessage = 'Bad request';
      validationErrors = error.response.data.errors 
        .map(error => error.msg)
        .join(', ');
      errorMessage = `${errorMessage}. ${validationErrors}`;
      break;
    case 400:
      errorMessage = error.response.data.message;
      validationErrors = error.response.data.message;
      break;
    case 401:
      errorMessage = error.response.data.error;
      break;
    case 403:
      errorMessage = error.response.data.message;
      validationErrors = error.response.data.message;
      break;
    case 404:
      errorMessage = error.response.data.message;
      break;
    default:
      errorMessage = error.response.data.error;
    }
  } else {
    // if server is down, client won't get a response
    errorMessage = 'Possible network error, please reload the page';
  }
  return errorMessage;
}
