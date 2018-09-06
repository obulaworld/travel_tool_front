import { combineReducers } from 'redux';
import auth from './auth';
import requests from './requests';
import modal from './modal';
import user from './user';
import role from './role';
import comments from './comments';

const rootReducer = combineReducers({
  auth,
  requests,
  modal,
  user,
  role,
  comments
});

export default rootReducer;
