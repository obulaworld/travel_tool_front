import {
  GET_ROLE_DATA,
  GET_ROLE_DATA_SUCCESS,
  GET_ROLE_DATA_FAILURE,
  PUT_ROLE_DATA,
  PUT_ROLE_DATA_SUCCESS,
  PUT_ROLE_DATA_FAILURE,
  FETCH_ROLE_USERS,
  FETCH_ROLE_USERS_SUCCESS,
  FETCH_ROLE_USERS_FAILURE
} from '../constants/actionTypes';
import Utils from '../../helper/Utils';

const initialState = { putRoleData: [], getRole: {}, roleErrors: '' };
let roleName;
const role = (state = initialState, action) => {
  switch (action.type) {
  case GET_ROLE_DATA:
    return { ...state, isLoading: true };
  case GET_ROLE_DATA_SUCCESS:
    return { ...state, getRole: action.response, isLoading: false };
  case GET_ROLE_DATA_FAILURE:
    return { ...state, isLoading: false, roleErrors: action.error };
  case PUT_ROLE_DATA:
    return { ...state, updatingRole: true };
  case PUT_ROLE_DATA_SUCCESS:
    return { ...state, putRoleData: action.roleData, updatingRole: false };
  case PUT_ROLE_DATA_FAILURE:
    return { ...state, updatingRole: false, putRoleData: action.response, roleErrors: action.error };
  case FETCH_ROLE_USERS:
    return { ...state, isFetching: true };
  case FETCH_ROLE_USERS_SUCCESS:
    roleName = action.roleName;
    state[`${Utils.toCamelCase(roleName)}s`] = action.users;
    return { ...state, isFetching: false, roleName: action.roleName , error: ''};
  case FETCH_ROLE_USERS_FAILURE:
    return { ...state, isFetching: false, error: action.error };
  default: return state;
  }
};

export default role;
