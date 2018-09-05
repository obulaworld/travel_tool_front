import apiErrorHandler from '../apiErrorHandler';

describe('Api Error Handler', () => {
  let error;

  beforeEach(() => {
    error = {
      response: {
        status: 0,
        data: {
          errors: ['name is required', 'destination is required'],
          message: ['errors', 'fix it']
        }
      }
    };
  });

  it('should handle a case when there is no response from the server', () => {
    error = { ...error, response: null };
    expect(apiErrorHandler(error)).toEqual(
      'Possible network error, please reload the page'
    );
  });

  it('should handle a case when the server returns 500', () => {
    error = { ...error, response: { status: 500 } };
    expect(apiErrorHandler(error)).toEqual('Server error, try again');
  });


  it('should handle a case when the server returns 400', () => {
    error = {
      ...error,
      response: {
        status: 400,
        data: {
          message: 'errors',
        }
      }
    };
    expect(apiErrorHandler(error)).toEqual('errors');
  });

  it('should handle errors from the server other than 500 and 422 errors', () => {
    error = { ...error,
      response: {
        status: 401,
        data:{
          error: 'Token is Invalid'
        }
      }
    };
    expect(apiErrorHandler(error)).toEqual('Token is Invalid');
  });

  it('should handle a case when the server returns validation errors', () => {
    error = {
      ...error,
      response: {
        status: 422,
        data: {
          'errors': [
            { 'name': 'name', 'msg': 'name is required' },
            { 'name': 'destination', 'msg': 'destination is required' },
          ]
        }
      }
    };
    expect(apiErrorHandler(error)).toEqual('Bad request. name is required, destination is required');
  });
});
