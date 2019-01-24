import emailReducer from '../emailReminder';

describe('Email reducer', () => {
  let initialState = {
    isLoading: false,
    reminders: [],
    error: {},
    meta: {documentCount: {}}
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
      meta: {documentCount: {}}
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
      meta: {documentCount: {}}
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
      meta: {documentCount: {}}
    };

    expect(newState).toEqual(expectedState);
  });
});
