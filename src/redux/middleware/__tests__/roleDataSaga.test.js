import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import RoleAPI from '../../../services/RoleAPI';
import {
  watchPutRoleDataSagaAsync,
  watchGetRoleDataSagaAsync
} from '../roleDataSaga';
import roles from '../../__mocks__/role';

const response = {
  data: {
    ...roles
  }
};

const action = {
  roleData: {
    roleName: 'super man',
    email: 'super.man@andela.com'
  }
};

const error = 'Possible network error, please reload the page';

describe('Role Saga', () => {
  describe('Fetch roles saga', () => {
    it('fetches roles ', () => {
      return expectSaga(watchGetRoleDataSagaAsync, RoleAPI)
        .provide([[call(RoleAPI.getRoleData), response]])
        .put({
          type: 'GET_ROLE_DATA_SUCCESS',
          response: response.data
        })
        .dispatch({
          type: 'GET_ROLE_DATA'
        })
        .run();
    });
  });

  it('throws error if there is an error fetching a roles', () => {
    return expectSaga(watchGetRoleDataSagaAsync, RoleAPI)
      .provide([[call(RoleAPI.getRoleData), throwError(error)]])
      .put({
        type: 'GET_ROLE_DATA_FAILURE',
        error
      })
      .dispatch({
        type: 'GET_ROLE_DATA'
      })
      .run();
  });

  it('update roles ', () => {
    return expectSaga(watchPutRoleDataSagaAsync, RoleAPI)
      .provide([[call(RoleAPI.putData, action.data), response]])
      .put({
        type: 'PUT_ROLE_DATA_SUCCESS',
        roleData: response.data
      })
      .dispatch({
        type: 'PUT_ROLE_DATA'
      })
      .run();
  });

  it('throws error if there is an error updating a roles', () => {
    return expectSaga(watchPutRoleDataSagaAsync, RoleAPI)
      .provide([[call(RoleAPI.putData, action.data), throwError(error)]])
      .put({
        type: 'PUT_ROLE_DATA_FAILURE',
        error
      })
      .dispatch({
        type: 'PUT_ROLE_DATA'
      })
      .run();
  });
});
