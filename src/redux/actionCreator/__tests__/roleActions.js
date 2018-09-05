import {
  fetchRoleUsers,
  fetchRoleUsersSuccess,
  fetchRoleUsersFailure
} from '../roleActions';

import { fetchRoleUsersResponse } from '../../__mocks__/mocks';

describe('Role Actions', () => {
  describe('Fetch role users actions', () => {
    it('should return action type FETCH_ROLE_USERS', () => {
      const expectedAction = {
        type: 'FETCH_ROLE_USERS',
        roleId: 53098
      };
      const createdAction = fetchRoleUsers(53098);
      expect(createdAction).toEqual(expectedAction);
    });
    it('should return action type FETCH_ROLE_USERS_SUCCESS', () => {
      const { roleName, users } = fetchRoleUsersResponse;
      const expectedAction = {
        type: 'FETCH_ROLE_USERS_SUCCESS',
        roleName,
        users
      };
      const createdAction = fetchRoleUsersSuccess(fetchRoleUsersResponse);
      expect(createdAction).toEqual(expectedAction);
    });
    it('should return action type FETCH_ROLE_USERS_FAILURE', () => {
      const expectedAction = {
        type: 'FETCH_ROLE_USERS_FAILURE',
        error: 'Role does not exist'
      };
      const createdAction = fetchRoleUsersFailure('Role does not exist');
      expect(createdAction).toEqual(expectedAction);
    });
  });
});
