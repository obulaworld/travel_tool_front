import {takeLatest, put, call} from 'redux-saga/effects';
import AccomodationApi from '../../services/accomodationApi';
import {
  initFetchTimelineData,
  fetchTimelineDataSuccess
} from '../actionCreator';

export function * fetchGuestHouseTimelineDataSaga(action) {
  try {
    const {guestHouseId, startDate, endDate} = action;
    const fetchTimelineData = AccomodationApi.fetchTimelineData;
    const response = yield call(fetchTimelineData, guestHouseId, startDate, endDate);
    yield put(fetchTimelineDataSuccess(response.data.guestHouse));
  } catch (e) {
    // FIXME: put failure here
    throw e;
  }
}

export function* watchFetchTimelneData() {
  yield takeLatest(initFetchTimelineData().type, fetchGuestHouseTimelineDataSaga);
}
