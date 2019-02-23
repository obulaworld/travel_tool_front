import travelReasonReducer, { initialState } from '../travelReason';
import {
  createTravelReason,
  createTravelReasonSuccess,
  createTravelReasonFailure,
  viewTravelDetails,
  viewTravelDetailsFailure,
  viewTravelDetailsSuccess,
} from '../../actionCreator/travelReasonsActions';

const body = {
  title: 'title',
  description: 'description'
};

const id = 1;

describe('Create Travel Reason actions', () => {
  it('should return initial state', () => {
    expect(travelReasonReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle CREATE_TRAVEL_REASONS', () => {
    const action = createTravelReason(body);
    const newState = travelReasonReducer(initialState, action);
    const expectedState = { ...initialState, isCreating: true };
    expect(newState).toEqual(expectedState);
    expect(newState.isCreating).toBe(true);
  });

  it('should handle CREATE_TRAVEL_REASONS_SUCCESS'
    , () => {
      const state = {
        ...initialState,
        isCreating: true,
        newReason: {
          title: 'title',
          description: 'description'
        }
      };

      const action = createTravelReasonSuccess(body);
      const newState = travelReasonReducer(state, action);
      const expectedState = { ...newState };
      expect(newState).toEqual(expectedState);
      expect(newState.isCreating).toBe(false);
    });

  it('should handle CREATE_TRAVEL_REASONS_FAILURE'
    , () => {
      const state = {
        ...initialState,
        isCreating: false,
        newReason: {
          title: 'title',
          description: 'description'
        }
      };
      const errors = 'Error';
      const action = createTravelReasonFailure(errors);
      const newState = travelReasonReducer(state, action);
      const expectedState = { ...state, errors };
      expect(newState).toEqual(expectedState);
      expect(newState.isCreating).toBe(false);
    });
});

describe('View Travel Reason Details actions', () => {
  it('should return initial state', () => {
    expect(travelReasonReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle VIEW_TRAVEL_REASON_DETAILS', () => {
    const action = viewTravelDetails(id);
    const newState = travelReasonReducer(initialState, action);
    const expectedState = { ...initialState, isFetching: true };
    expect(newState).toEqual(expectedState);
    expect(newState.isFetching).toBe(true);
  });

  it('should handle VIEW_TRAVEL_REASON_DETAILS_SUCCESS'
    , () => {
      const state = {
        ...initialState,
        isFetching: true,
        reasonDetails: {
          title: 'title',
          description: 'description'
        }
      };

      const action = viewTravelDetailsSuccess(body);
      const newState = travelReasonReducer(state, action);
      const expectedState = { ...newState };
      expect(newState).toEqual(expectedState);
      expect(newState.isFetching).toBe(false);
    });

  it('should handle VIEW_TRAVEL_REASON_DETAILS_FAILURE'
    , () => {
      const state = {
        ...initialState,
        isFetching: false,
        newReason: {
          title: 'title',
          description: 'description'
        }
      };
      const errors = 'Error';
      const action = viewTravelDetailsFailure(errors);
      const newState = travelReasonReducer(state, action);
      const expectedState = { ...state, errors };
      expect(newState).toEqual(expectedState);
      expect(newState.isFetching).toBe(false);
    });
});
