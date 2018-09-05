import {
  FETCH_ROLE_USERS,
  FETCH_ROLE_USERS_SUCCESS,
  FETCH_ROLE_USERS_FAILURE,
} from '../constants/actionTypes';

export const fetchRoleUsers = roleId => ({
  type: FETCH_ROLE_USERS,
  roleId
});

export const fetchRoleUsersSuccess = ({roleName, users}) => ({
  type: FETCH_ROLE_USERS_SUCCESS,
  users,
  roleName
});

export const fetchRoleUsersFailure = error => ({
  type: FETCH_ROLE_USERS_FAILURE,
  error
});
