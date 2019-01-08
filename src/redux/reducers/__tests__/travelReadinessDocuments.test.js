import travelReadinessDocuments from '../travelReadinessDocuments';
import {
  createTravelReadinessDocument, createTravelReadinessDocumentFailure, createTravelReadinessDocumentSuccess
} from '../../actionCreator/travelReadinessActions';

const initialState = {
  isLoading: false,
  document: {},
  errors: {}
};

describe('travel readiness reducer', () =>{
  it('returns initial state', () =>{
    expect(travelReadinessDocuments(initialState, {})).toEqual(initialState);
  });

  it('handles create documents action appropriately', () =>{
    const expectedOutput = {
      isLoading: true,
      document: {},
      errors: {}
    };
    expect(travelReadinessDocuments(initialState, {
      type: 'CREATE_TRAVEL_READINESS_DOCUMENT',
      response: {},
    })).toEqual(expectedOutput);
  });

  it('handles CREATE_TRAVEL_READINESS_DOCUMENT_SUCCESS', () => {
    const expectedOutput = {
      isLoading: false,
      document: {message:'successfully loaded'},
      errors: {}
    };
    expect(travelReadinessDocuments(initialState, {
      type: 'CREATE_TRAVEL_READINESS_DOCUMENT_SUCCESS',
      response: {message:'successfully loaded'}
    })).toEqual(expectedOutput);
  });

  it('handles errors appropriately', () =>{
    const error = {
      'success': false,
      'message': 'Validation failed',
      'errors': [
        {
          'message': 'country should be provided',
          'name': 'visa.country'
        },
        {
          'message': 'expiry date date must be provided in the form mm/dd/yyyy',
          'name': 'visa.expiryDate'
        },
        {
          'message': 'expiry date should be greater than date of issue',
          'name': 'visa.expiryDate'
        }
      ]
    };

    const expectedOutput =  {
      'document': {},
      'errors':
        {
          'country': 'country should be provided',
          'expiryDate': 'expiry date should be greater than date of issue'
        },
      'isLoading': false
    };
    expect(travelReadinessDocuments(initialState, {
      type: 'CREATE_TRAVEL_READINESS_DOCUMENT_FAILURE',
      error
    })).toEqual(expectedOutput);

    expect(travelReadinessDocuments(initialState, {
      type: 'CREATE_TRAVEL_READINESS_DOCUMENT_FAILURE',
      error: {}
    })).toEqual({'document': {}, 'errors': {}, 'isLoading': false});
  });
});
