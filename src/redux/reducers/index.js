import { combineReducers } from 'redux';
import auth from './auth';
import requests from './requests';
import modal from './modal';

const rootReducer = combineReducers({
  auth,
  requests,
  modal
});

export default rootReducer;
