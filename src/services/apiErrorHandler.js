export default function apiErrorHandler(error) {
  let errorMessage;
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
    default:
      // FIX: change errors to message? - some err responses
      // wont return an array of errors
      errorMessage = error.response.data.errors;
    }
  } else {
    // if server is down, client won't get a response
    errorMessage = 'Possible network error, please reload the page';
  }
  return errorMessage;
}
