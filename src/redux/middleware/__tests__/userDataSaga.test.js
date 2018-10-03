import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import UserAPI from '../../../services/UserAPI';
import {
  watchPostUserDataSagaAsync,
  watchGetUserDataSagaAsync
} from '../userDataSaga';
import user from '../../__mocks__/user';

const response = {
  data: {
    ...user
  }
};
const id = 'JFENDVNDK';

const error = 'Possible network error, please reload the page';

describe('User Saga', () => {
  describe('Fetch user data saga', () => {
    it('fetches user ', () => {
      return expectSaga(watchGetUserDataSagaAsync, UserAPI)
        .provide([[call(UserAPI.getUserData, id), response]])
        .put({
          type: 'GET_USER_DATA_SUCCESS',
          response: response.data
        })
        .dispatch({
          type: 'GET_USER_DATA',
          id
        })
        .run();
    });
  });

  it('throws error if there is an error fetching a users detail', () => {
    return expectSaga(watchGetUserDataSagaAsync, UserAPI)
      .provide([[call(UserAPI.getUserData, id), throwError(error)]])
      .put({
        type: 'GET_USER_DATA_FAILURE',
        error
      })
      .dispatch({
        type: 'GET_USER_DATA',
        id
      })
      .run();
  });

  it('fails to post user data', () => {
    return expectSaga(watchPostUserDataSagaAsync, UserAPI)
      .provide([[call(UserAPI.postNewUsers, user), throwError(error)]])
      .put({
        type: 'POST_USER_DATA_FAILURE',
        error
      })
      .dispatch({
        type: 'POST_USER_DATA',
        userData: user
      })
      .run();
  });
});
