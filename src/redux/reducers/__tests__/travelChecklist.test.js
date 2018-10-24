import travelChecklistReducer, { initialState } from '../travelChecklist';
import {
  fetchTravelChecklist,
  fetchTravelChecklistFailure,
  fetchTravelChecklistSuccess,
  createChecklistFailure,
  createTravelChecklist,
  createChecklistSuccess
} from '../../actionCreator/travelChecklistActions';
import travelChecklistMockData from '../../__mocks__/travelChecklistsMockData';
import { DELETE_TRAVEL_CHECKLIST_FAILURE, DELETE_TRAVEL_CHECKLIST_SUCCESS, DELETE_TRAVEL_CHECKLIST } from '../../constants/actionTypes';

describe('Travel checklists reducer', () => {
  describe('Fetch travel checklists reducer', () => {
    it(`should update 'isLoading' state to true
    while sending get travel checklist server request`, (done) => {
      const action = fetchTravelChecklist('request-test-id');
      const newState = travelChecklistReducer(initialState, action);
      expect(newState.isLoading).toBe(true);
      done();
    });

    it('should add travelChecklist to state on successful fetching',
      (done) => {
        const currentState = {
          ...initialState,
          isLoading: true,
          checklistItems: travelChecklistMockData
        };
        const response = {
          travelChecklists: travelChecklistMockData
        };

        const action = fetchTravelChecklistSuccess(response);
        const newState = travelChecklistReducer(currentState, action);

        expect(newState.isLoading).toBe(false);
        expect(newState.checklistItems).toMatchObject(travelChecklistMockData);
        done();
      });

    it('should add travelChecklist to state on successful fetching',
      (done) => {
        const currentState = {
          ...initialState,
          isLoading: true,
          checklistItems: travelChecklistMockData
        };
        const error = 'Server Error';

        const action = fetchTravelChecklistFailure(error);
        const newState = travelChecklistReducer(currentState, action);

        expect(newState).toEqual({
          ...initialState,
          isLoading: false,
          checklistItems: [],
          error: 'Server Error'
        });

        done();
      });
  });

  describe('Update travel checklist reducer', () => {
    const initialState = {
      updatingChecklist: false,
      checklistItems: [
        {name: 'Yellow Fever', id: 'sd343f4'},
        {name: 'Passport', id: '34ffr4'}
      ],
      error: ''
    };

    let action, newState, expectedState;

  
    it('should handle UPDATE_TRAVEL_CHECKLIST', () => {
      action = {
        type: 'UPDATE_TRAVEL_CHECKLIST',
        checklistItemId: 'sj3934sa',
        checklistItemData: {name: 'newItem'}
      };

      newState = travelChecklistReducer(initialState, action);
      expectedState = {
        updatingChecklist: true,
        checklistItems: [
          {name: 'Yellow Fever', id: 'sd343f4'},
          {name: 'Passport', id: '34ffr4'}
        ],
        error: ''
      };

      expect(newState).toEqual(expectedState);
    });
    it('should handle UPDATE_TRAVEL_CHECKLIST_SUCCESS', () => {
      action = {
        type: 'UPDATE_TRAVEL_CHECKLIST_SUCCESS',
        updatedChecklistItem: {name: 'Tax clearance', id: 'sd343f4'},
        checklistItemId: 'sd343f4'
      };

      newState = travelChecklistReducer(initialState, action);

      expectedState = {
        updatingChecklist: false,
        checklistItems: [
          {name: 'Tax clearance', id: 'sd343f4'},
          {name: 'Passport', id: '34ffr4'}
        ],
        error: ''
      };

      expect(newState).toMatchObject(expectedState);
    });
    it('should handle UPDATE_TRAVEL_CHECKLIST_FAILURE', () => {
      action = {
        type: 'UPDATE_TRAVEL_CHECKLIST_FAILURE',
        error: {message: 'Something went wrong'}
      };

      newState = travelChecklistReducer(initialState, action);

      expectedState = {
        updatingChecklist: false,
        checklistItems: [
          {name: 'Yellow Fever', id: 'sd343f4'},
          {name: 'Passport', id: '34ffr4'}
        ],
        error: {message: 'Something went wrong'}
      };

      expect(newState).toEqual(expectedState);
    });
  });

  describe('Delete travelChecklist reducer', () => {
    let action, newState, expectedState;

    it('should return initial state', () => {
      expect(travelChecklistReducer(undefined, {})).toEqual({
        ...initialState
      });
    });

    it('should handle DELETE_TRAVEL_CHECKLIST', () => {
      action = {
        type: DELETE_TRAVEL_CHECKLIST,
        checklistItemId: 'zcis7csUe',
      };

      newState = travelChecklistReducer(initialState, action);
      expectedState = {
        checklistItems: [],
        creatingChecklist: false,
        deletingChecklist: true,
        error: '',
        fetchingChecklists: false,
        isLoading: false,
        updatingChecklist: false
      },

      expect(newState).toEqual(expectedState);
    });

    it('should handle DELETE_TRAVEL_CHECKLIST_SUCCESS', () => {
      action = {
        type: DELETE_TRAVEL_CHECKLIST_SUCCESS,
        checklistItemId: 'wsis45cUe',
      };

      newState = travelChecklistReducer(initialState, action);

      expectedState = {
        checklistItems: [],
        creatingChecklist: false,
        deletingChecklist: false,
        error: '',
        fetchingChecklists: false,
        isLoading: false,
        updatingChecklist: false
      },
      expect(newState).toEqual(expectedState);
    });

    it('should handle DELETE_TRAVEL_CHECKLIST_FAILURE', () => {
      const error = 'Checklist item not found';
      action = {
        type: DELETE_TRAVEL_CHECKLIST_FAILURE,
        error
      };

      newState = travelChecklistReducer(initialState, action);
      expectedState = {
        deletingChecklist: false,
        error: 'Checklist item not found'
      };
      expect(newState).toMatchObject(expectedState);
    });
  });
  describe('Create travel checklist reducer', () => {
    it('should return initial state', () => {
      expect(travelChecklistReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle CREATE_TRAVEL_CHECKLIST', () => {
      const action = createTravelChecklist({
        name: 'name',
        requiresFiles: true,
        label: 'label',
        link: 'link'
      });
      const newState = travelChecklistReducer(initialState, action);
      expect(newState.creatingChecklist).toBe(true);
    });

    it('should handle CREATE_TRAVEL_CHECKLIST_SUCCESS',
      () => {
        const currentState = {
          ...initialState,
          creatingChecklist: true,
          checklistItems: travelChecklistMockData
        };
        const checklist = {
          name: 'name',
          requiresFiles: true,
          label: 'label',
          link: 'link'
        };

        const action = createChecklistSuccess(checklist);
        const newState = travelChecklistReducer(currentState, action);

        expect(newState.creatingChecklist).toBe(false);
        expect(newState.checklistItem).toBe(checklist);
        expect(newState.checklistItems).toMatchObject(travelChecklistMockData);
      });

    it('should handle CREATE_TRAVEL_CHECKLIST_FAILURE',
      () => {
        const currentState = {
          ...initialState,
          creatingChecklist: true,
          checklistItems: travelChecklistMockData
        };
        const error = 'Error';
        const action = createChecklistFailure(error);
        const newState = travelChecklistReducer(currentState, action);
        expect(newState.creatingChecklist).toEqual(false);
        expect(newState.error).toEqual(error);
      });
  });
});
