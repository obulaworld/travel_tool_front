import readiness from '../readiness';
import {
  FETCH_TRAVEL_READINESS, FETCH_TRAVEL_READINESS_FAILURE, FETCH_TRAVEL_READINESS_SUCCESS

} from '../../constants/actionTypes';
import { fetchReadinessResponse

} from '../../__mocks__/mocks';
import { fetchReadinessFailure, fetchReadinessSuccess, fetchReadiness, exportReadiness, exportReadinessFailure, exportReadinessSuccess } from '../../actionCreator/travelReadinessActions';

describe('Test suite for readiness reducer', () => {
  const initialState = {
    readiness: {}, 
    isLoading:false, 
    error: {} 
  };
  it('should return initial state', () => {
    expect(readiness(undefined, {})).toEqual({
      ...initialState
    });
  });
  it('`should update isLoading state to true for FETCH_TRAVEL_READINESS', (done) => {
    const action = fetchReadiness();
    const newState = readiness(initialState, action);
    expect(newState.isLoading).toBe(true);
    done();
  });
  it('`should update isLoading state to true for EXPORT_TRAVEL_READINESS', (done) => {
    const action = exportReadiness();
    const newState = readiness(initialState, action);
    expect(newState.isLoading).toBe(true);
    done();
  });
  it('`should update isLoading state to false for EXPORT_TRAVEL_READINESS_SUCCESS', (done) => {
    const action = exportReadinessSuccess();
    const newState = readiness(initialState, action);
    expect(newState.isLoading).toBe(false);
    done();
  });
  it('`should update isLoading state to false for EXPORT_TRAVEL_READINESS_FAILURE', (done) => {
    const action = exportReadinessFailure();
    const newState = readiness(initialState, action);
    expect(newState.isLoading).toBe(false);
    done();
  });


  it('should handle FETCH_READINESS_SUCCESS',
    (done) => {
      const currentState = {
        ...initialState,
        isLoading: true,
        readiness: {}
      };

      const action = fetchReadinessSuccess(fetchReadinessResponse);
      const newState = readiness(currentState, action);
      expect(newState.isLoading).toBe(false);      
      expect(newState.readiness).toMatchObject(fetchReadinessResponse);
      done();
    });

  it('should handle FETCH_READINESS_FAILURE',
    (done) => {
      const currentState = {
        ...initialState,
        isLoading: true,
        error: null
      };
      const error = 'Error';
      const action = fetchReadinessFailure(error);
      const newState = readiness(currentState, action);
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toEqual(error);
      done();
    });
});
