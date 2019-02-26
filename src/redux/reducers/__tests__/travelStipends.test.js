import travelStipends from '../travelStipends';
import {
  createStipendMock,
} from '../../__mocks__/reduxMocks';

describe('travel stipends Reducer', () => {

  describe('Create Requests reducer', () => {
    let initialState = {
      isLoading: false,
      error: '',
      travelStipend: {},
    };

    let action, newState, receivedState, error;

    const requestObj = { ...createStipendMock.requestObj };

    it('should return initial state', () => {
      expect(travelStipends(initialState, {})).toEqual({
        ...initialState
      });
    });

    it('should handle CREATE_TRAVEL_STIPEND', () => {
      action = {
        type: 'CREATE_TRAVEL_STIPEND',
        requestData: { ...requestObj },
      };

      newState = travelStipends(initialState, action);
      receivedState = {
        ...initialState,
        isLoading: true,
      };

      expect(newState).toEqual(receivedState);
    });

    it('should handle CREATE_TRAVEL_STIPEND_FAILURE', () => {
      error = 'failed to add new stipend';
      action = {
        type: 'CREATE_TRAVEL_STIPEND_FAILURE',
        error
      };

      newState = travelStipends(initialState, action);
      receivedState = {
        ...initialState,
        isLoading: false,
        error: 'failed to add new stipend',
        travelStipend: {}
      };
      expect(newState).toEqual(receivedState);
    });

    it('should handle CREATE_TRAVEL_STIPEND_SUCCESS', () => {
      initialState = {
        travelStipend: {},
      };
      action = {
        type: 'CREATE_TRAVEL_STIPEND_SUCCESS',
        newStipend: { ...requestObj }
      };

      newState = travelStipends(initialState, action);
      receivedState = {
        isLoading: false,
        travelStipend: action.newStipend,
        error: ''
      };

      expect(newState).toEqual(receivedState);
      expect(travelStipends(newState, action).travelStipend.center).toMatch('Kigali');
    });
  });
});
