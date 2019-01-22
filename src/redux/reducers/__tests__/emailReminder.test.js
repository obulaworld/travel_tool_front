import emailReducer from '../emailReminder';
import {
  DISABLE_REMINDER_CONDITION,
  DISABLE_REMINDER_CONDITION_SUCCESS,
  DISABLE_REMINDER_CONDITION_FAILURE
} from '../../constants/actionTypes';

describe('Email reducer', () => {
  let initialState = {
    isLoading: false,
    reminders: [],
    error: {},
    meta: {documentCount: {}},
    disabling: false,
  };

  let action, newState, expectedState;
  it('should return initial state', () => {
    expect(emailReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_REMINDERS', () => {
    action = {
      type: 'FETCH_EMAIL_REMINDERS',
    };

    newState = emailReducer(initialState, action);
    expectedState = {
      isLoading: true,
      reminders: [],
      error: {},
      meta: {documentCount: {}},
      disabling: false,
    };

    expect(newState).toEqual(expectedState);
  });

  it('should handle FETCH_REMINDERS_SUCCESS', () => {
    action = {
      type: 'FETCH_EMAIL_REMINDERS_SUCCESS',
    };

    newState = emailReducer(initialState, action);
    expectedState = {
      isLoading: false,
      reminders: [],
      error: {},
      meta: {documentCount: {}},
      disabling: false,
    };

    expect(newState).toEqual(expectedState);
  });

  it('should handle FETCH_EMAIL_REMINDER_FAILURE', () => {
    action = {
      type: 'FETCH_EMAIL_REMINDERS_FAILURE',
    };

    newState = emailReducer(initialState, action);
    expectedState = {
      isLoading: false,
      reminders: [],
      error: undefined,
      meta: {documentCount: {}},
      disabling: false,
    };

    expect(newState).toEqual(expectedState);
  });

  describe('disable reminder condition', () => {
    let action, newState, expectedState;

    it('should return initial state', () => {
      expect(emailReducer(undefined, {})).toEqual(initialState);
    });
    
    it('should handle DISABLE_REMINDER_CONDITION', () => {
      action = {
        type: DISABLE_REMINDER_CONDITION,
        conditionId: 'zcis7csUe',
        reason: 'No more applicable'
      };

      newState = emailReducer(initialState, action);
      expectedState = {
        disabling: true,
        reminders: [],
        error: {},
        isLoading: false,
        meta: {documentCount: {}},
      },

      expect(newState).toEqual(expectedState);
    });

    it('should handle DISABLE_REMINDER_CONDITION_SUCCESS', () => {
      initialState = {
        disabling: false,
        reminders: [
          {
            id: '76878987',
            conditionName: 'Passport expiry'
          },
          {
            id: '7687977',
            conditionName: 'Visa expiry'
          }
        ],
        error: {},
        isLoading: false,
        meta: {documentCount: {}},
      },

      action = {
        type: DISABLE_REMINDER_CONDITION_SUCCESS,
        condition: { 
          id: '76878987',
          conditionName: 'Reminder for visa'
        },
      };

      newState = emailReducer(initialState, action);

      expectedState = {
        disabling: false,
        reminders: [
          {
            id: '76878987',
            conditionName: 'Reminder for visa'
          },
          {
            id: '7687977',
            conditionName: 'Visa expiry'
          }
        ],
        error: {},
        isLoading: false,
        meta: {documentCount: {}},
      },
      expect(newState).toEqual(expectedState);
    });

    it('should handle DISABLE_REMINDER_CONDITION_FAILURE', () => {
      initialState = {
        disabling: false,
        reminders: [],
        error: {},
        isLoading: false,
        meta: {documentCount: {}},
      },
      action = {
        type: DISABLE_REMINDER_CONDITION_FAILURE,
        error: 'An error occured',
      };

      newState = emailReducer(initialState, action);

      expectedState = {
        disabling: false,
        reminders: [],
        error: 'An error occured',
        isLoading: false,
        meta: {documentCount: {}}
      },
      expect(newState).toEqual(expectedState);
    });
  });
});
