import readiness from '../readiness';
import {
  FETCH_TRAVEL_READINESS, FETCH_TRAVEL_READINESS_FAILURE, FETCH_TRAVEL_READINESS_SUCCESS

} from '../../constants/actionTypes';
import { fetchReadinessResponse

} from '../../__mocks__/mocks';
import { fetchReadinessfailure, fetchReadinessSuccess, fetchReadiness } from '../../actionCreator/travelReadinessActions';

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

//   it('should update state with payload upon FETCH_TRAVEL_READINESS_SUCCESS', () => {
//     const action = {
//       type: FETCH_TRAVEL_READINESS_SUCCESS,
//       response: fetchReadinessResponse.readiness,
//       success: fetchReadinessResponse.success
//     };
//     expect(readiness(initialState, action)).toEqual({
//       ...initialState,
//       readiness: {
//         ...initialState.readiness,
//         isLoading:false
//       }
//     });
//   });

  it('should handle FETCH_READINESS_FAILURE',
    (done) => {
      const currentState = {
        ...initialState,
        isLoading: true,
        error: null
      };
      const error = 'Error';
      const action = fetchReadinessfailure(error);
      const newState = readiness(currentState, action);
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toEqual(error);
      done();
    });
});
