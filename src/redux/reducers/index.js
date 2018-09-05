import { combineReducers } from 'redux';
import auth from './auth';
import requests from './requests';
import modal from './modal';
import user from './user';
import role from './role';

const rootReducer = combineReducers({
  auth,
  requests,
  modal,
  user,
  role
});

export default rootReducer;
