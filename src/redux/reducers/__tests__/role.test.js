import role from '../role';
import {
  FETCH_ROLE_USERS,
  FETCH_ROLE_USERS_SUCCESS,
  FETCH_ROLE_USERS_FAILURE,
} from '../../constants/actionTypes';
import { fetchRoleUsersResponse } from '../../__mocks__/mocks';


describe('Requests Reducer', () => {
  describe('Fetch role  Reducer', () => {
    const initialState = {};
    it('returns the correct initial state', () => {
      expect(role(undefined, {})).toEqual({});
    });

    it('returns the correct state for FETCH_ROLE_USERS action', () => {
      const action = {
        type: FETCH_ROLE_USERS,
        roleId: 53098
      };
      expect(role(initialState, action)).toEqual({
        isFetching: true,
      });
    });

    it('returns the correct state for FETCH_ROLE_USERS_SUCCESS action', () => {
      const action = {
        type: FETCH_ROLE_USERS_SUCCESS,
        roleName: fetchRoleUsersResponse.roleName,
        users: fetchRoleUsersResponse.users,
      };
      expect(role(initialState, action)).toEqual({
        isFetching: false,
        manager: fetchRoleUsersResponse.users
      });
    });

    it('returns the correct state for FETCH_ROLE_USERS_FAILURE action', () => {
      const initialState = {};
      const action = {
        type: FETCH_ROLE_USERS_FAILURE,
        error: 'An error occurred',
      };
      expect(role(initialState, action)).toEqual({
        isFetching: false,
        error: 'An error occurred'
      });
    });
  });
});
