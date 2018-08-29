import apiErrorHandler from '../apiErrorHandler';

describe('Api Error Handler', () => {
  let error;

  beforeEach(() => {
    error = {
      response: {
        status: 0,
        data: {
          errors: ['name is required', 'destination is required']
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

  it('should handle a case when the server returns validation errors', () => {
    error = {
      ...error,
      response: {
        status: 422,
        data: {
          'errors': [
            { 'name': 'name', 'message': 'name is required' },
            { 'name': 'destination', 'message': 'destination is required' },
          ]
        }
      }
    };
    expect(apiErrorHandler(error)).toEqual([
      { 'name': 'name', 'message': 'name is required' },
      { 'name': 'destination', 'message': 'destination is required' },
    ]);
  });
});
