import {
  FETCH_ROLE_USERS,
  FETCH_ROLE_USERS_SUCCESS,
  FETCH_ROLE_USERS_FAILURE
} from '../constants/actionTypes';

const initialState = {};
let roleName;

const role = (state=initialState, action) => {
  switch(action.type) {
  case FETCH_ROLE_USERS:
    return {
      ...state,
      isFetching: true,
    };
  case FETCH_ROLE_USERS_SUCCESS:
    roleName = action.roleName;
    state[`${roleName.toLowerCase()}`] = action.users;
    return {
      ...state,
      isFetching: false,
    };
  case FETCH_ROLE_USERS_FAILURE:
    return {
      ...state,
      isFetching: false,
      error: action.error
    };
  default: return state;
  }
};

export default role;
