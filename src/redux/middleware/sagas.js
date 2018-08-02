import { all, put, takeEvery  } from 'redux-saga/effects';
import * as types from '../constants/actionTypes';

// this is a watcher saga, watches for actions dispatched to the store then calls the incrementAsync saga
function* watchbuttonChange() {
  yield takeEvery('CLICK_BUTTON_SAGA', buttonChange);
}

// Our worker Saga: will perform the async increment task when watcher sage sees the action
function* buttonChange() {
  // dispatch click button action to the reducer
 yield put({ type: types.CLICK_BUTTON });
}

// export the worker saga
export default function* rootSaga() {
    yield all([
        watchbuttonChange()
    ]);
}
