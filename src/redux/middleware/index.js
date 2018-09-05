import { all } from 'redux-saga/effects';
import { userAuth } from './userAuthSagas';
import { watchFetchRequests, watchCreateNewRequestAsync } from './requestsSaga';
import { watchPostUserDataSagaAsync, watchGetUserDataSagaAsync } from './userDataSaga';
import { watchGetRoleDataSagaAsync, watchPutRoleDataSagaAsync } from './roleDataSaga';
import { watchFetchRoleUsers } from './roleSaga';

function* rootSaga() {
  yield all([
    userAuth(),
    watchFetchRequests(),
    watchCreateNewRequestAsync(),
    watchPostUserDataSagaAsync(),
    watchGetUserDataSagaAsync(),
    watchGetRoleDataSagaAsync(),
    watchPutRoleDataSagaAsync(),
    watchFetchRoleUsers(),
  ]);
}

export default rootSaga;
