import { all } from 'redux-saga/effects';
import { userAuth } from './userAuthSagas';

function* rootSaga() {
  yield all([
    userAuth()
  ]);
}

export default rootSaga;
