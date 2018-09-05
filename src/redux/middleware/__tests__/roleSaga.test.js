import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import RoleAPI from '../../../services/RoleAPI';
import { watchFetchRoleUsers } from '../roleSaga';
import { fetchRoleUsersResponse } from '../../__mocks__/mocks';

const response = {
  data: {
    result: {
      ...fetchRoleUsersResponse
    }
  }
};
const errorResponse = {
  response: {
    data: {
      error: 'An error occurred'
    }
  }
};

describe('Role Saga', () => {
  describe('Fetch role users saga', () => {
    it('fetches users with a particular role', () => {
      return expectSaga(watchFetchRoleUsers, RoleAPI)
        .provide([
          [call(RoleAPI.getRoleUsers, 53098), response]
        ])
        .put({
          type: 'FETCH_ROLE_USERS_SUCCESS',
          roleName: fetchRoleUsersResponse.roleName,
          users: fetchRoleUsersResponse.users,
        })
        .dispatch({
          type: 'FETCH_ROLE_USERS',
          roleId: 53098,
        })
        .run();
    });

    it('throws error if there is an error fetching user\'s of a role', () => {
      return expectSaga(watchFetchRoleUsers, RoleAPI)
        .provide([
          [call(RoleAPI.getRoleUsers, 53098), throwError(errorResponse)]
        ])
        .put({
          type: 'FETCH_ROLE_USERS_FAILURE',
          error: 'An error occurred'
        })
        .dispatch({
          type: 'FETCH_ROLE_USERS',
          roleId: 53098,
        })
        .run();
    });

  });
});
