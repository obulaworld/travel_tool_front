import reminders, { initialState } from '../reminders';
import * as types from '../../constants/actionTypes';

describe('reminders reducer', () => {
  it('returns the initial state', () => {
    expect(reminders(undefined, {})).toEqual(initialState);
  });

  it('handles CREATE_REMINDER action', () => {
    const expectedState = {
      ...initialState,
      newReminder: {
        ...initialState.newReminder,
        isCreating: true,
        errors: {}
      }
    };
    expect(reminders(initialState, {
      type: types.CREATE_REMINDER,
    })).toEqual(expectedState);
  });

  it('handles CREATE_REMINDER_SUCCESS action', () => {
    const expectedState = {
      ...initialState,
      newReminder: {
        ...initialState.newReminder,
        isCreating: false,
        data: {id: 1},
        errors: {}
      }
    };

    expect(reminders(initialState, {
      type: types.CREATE_REMINDER_SUCCESS,
      reminder: {id: 1}
    })).toEqual(expectedState);
  });

  it('handles CREATE_REMINDER_FAILURE action', () => {
    const expectedState = {
      ...initialState,
      newReminder: {
        ...initialState.newReminder,
        isCreating: false,
        errors: {conditionName: 'condition name must be unique'}
      }
    };

    expect(reminders(initialState, {
      type: types.CREATE_REMINDER_FAILURE,
      errors: {conditionName: 'condition name must be unique'}
    })).toEqual(expectedState);
  });

  it('handles FETCH_ALL_EMAIL_TEMPLATES action', () => {
    const expectedState = {
      ...initialState,
      isLoading: true
    };

    expect(reminders(initialState, {
      type: types.FETCH_ALL_EMAIL_TEMPLATES,
    })).toEqual(expectedState);
  });

  it('handles FETCH_ALL_EMAIL_TEMPLATES_SUCCESS action', () => {
    const expectedState = {
      ...initialState,
      isLoading: false,
      currentPage: 5,
    };

    expect(reminders(initialState, {
      type: types.FETCH_ALL_EMAIL_TEMPLATES_SUCCESS,
      pagination: {
        currentPage: 5
      },
      templates: [{id: 1}]
    })).toEqual(expectedState);
  });

  it('does not append new templates to existing templates when at the last pagination', () => {
    const expectedState = {
      ...initialState,
      isLoading: false,
      templates: [],
      currentPage: 0,
    };

    expect(reminders(initialState, {
      type: types.FETCH_ALL_EMAIL_TEMPLATES_SUCCESS,
      pagination: {
        currentPage: 0
      },
      templates: [{id: 1}]
    })).toEqual(expectedState);
  });

  it('resets the template state when CREATE_REMINDER_EMAIL_TEMPLATE is fired', () => {
    const expectedState = {
      ...initialState,
      templates: [],
    };

    expect(reminders(initialState, {
      type: types.CREATE_REMINDER_EMAIL_TEMPLATE
    })).toEqual(expectedState);
  });
});
