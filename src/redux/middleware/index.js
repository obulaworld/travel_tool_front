import { all } from 'redux-saga/effects';
import { userAuth } from './userAuthSagas';
import { watchFetchRequests, watchCreateNewRequestAsync } from './requestsSaga';
import { watchFetchRoleUsers } from './roleSaga';

function* rootSaga() {
  yield all([
    userAuth(),
    watchFetchRequests(),
    watchCreateNewRequestAsync(),
    watchFetchRoleUsers(),
  ]);
}

export default rootSaga;
