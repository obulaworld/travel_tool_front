import {
  FETCH_EMAIL_REMINDERS,
  FETCH_EMAIL_REMINDERS_SUCCESS,
  FETCH_EMAIL_REMINDERS_FAILURE
} from '../constants/actionTypes';

export const initialState = {
  isLoading: false,
  reminders: [],
  error: {},
  meta: {documentCount: {}}
};

const emailReminders = (state=initialState, action) => {
  switch (action.type) {
  case FETCH_EMAIL_REMINDERS:
    return {...state, isLoading: true};
  case FETCH_EMAIL_REMINDERS_SUCCESS:
    return {...state, isLoading: false, ...action.payload};
  case FETCH_EMAIL_REMINDERS_FAILURE:
    return { ...state, isLoading: false, error: action.error};
  default:
    return state;
  }

};

export default emailReminders;
