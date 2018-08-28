import { all } from 'redux-saga/effects';
import { userAuth } from './userAuthSagas';
import { watchFetchRequests } from './requestsSaga';

function* rootSaga() {
  yield all([
    userAuth(),
    watchFetchRequests(),
  ]);
}

export default rootSaga;
