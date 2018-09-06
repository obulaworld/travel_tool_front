import { all } from 'redux-saga/effects';
import { userAuth } from './userAuthSagas';
import { 
  watchFetchRequests,
  watchCreateNewRequestAsync,
  watchFetchUserRequestsDetails
} from './requestsSaga';
import { 
  watchPostUserDataSagaAsync,
  watchGetUserDataSagaAsync
} from './userDataSaga';
import {
  watchGetRoleDataSagaAsync,
  watchPutRoleDataSagaAsync
} from './roleDataSaga';
import { watchFetchRoleUsers } from './roleSaga';
import { watchCreateComment } from './commentsSaga';

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
    watchFetchUserRequestsDetails(),
    watchCreateComment(),
  ]);
}

export default rootSaga;
