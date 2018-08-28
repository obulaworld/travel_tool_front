import { combineReducers } from 'redux';
import auth from './auth';
import requests from './requests';

const rootReducer = combineReducers({
  auth,
  requests,
});

export default rootReducer;
