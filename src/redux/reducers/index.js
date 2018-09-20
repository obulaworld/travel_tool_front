import { combineReducers } from 'redux';
import auth from './auth';
import requests from './requests';
import approvals from './approvals';
import modal from './modal';
import user from './user';
import role from './role';
import notifications from './notifications';
import comments from './comments';

const rootReducer = combineReducers({
  auth,
  requests,
  approvals,
  modal,
  user,
  role,
  comments,
  notifications
});

export default rootReducer;
