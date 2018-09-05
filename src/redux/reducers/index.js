import { combineReducers } from 'redux';
import auth from './auth';
import requests from './requests';
import modal from './modal';
import role from './role';

const rootReducer = combineReducers({
  auth,
  requests,
  modal,
  role
});

export default rootReducer;
