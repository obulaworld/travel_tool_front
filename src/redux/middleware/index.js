import { all } from 'redux-saga/effects';
import { userAuth } from './userAuthSagas';
import { watchFetchRequests, watchCreateNewRequestAsync } from './requestsSaga';

function* rootSaga() {
  yield all([
    userAuth(),
    watchFetchRequests(),
    watchCreateNewRequestAsync()
  ]);
}

export default rootSaga;
