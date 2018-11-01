import { put, takeLatest, call } from 'redux-saga/effects';
import FileSaver from 'file-saver';

import { fetchAnalyticsSuccess, fetchAnalyticsFailure } from '../actionCreator/analyticsActions';
import apiErrorHandler from '../../services/apiErrorHandler';
import { FETCH_ANALYTICS } from '../constants/actionTypes';
import AnalyticsAPI from '../../services/AnalyticsAPI';

export function* fetchAnalyticsSaga({query}) {
  try {
    const {data} = yield call(AnalyticsAPI.getAnalytics, query);
    if(query === '?type=file') {
      yield FileSaver.saveAs(data, 'Requests/Trips Analytics');
    } else {
      yield put(fetchAnalyticsSuccess(data.data));
    }
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(fetchAnalyticsFailure(errorMessage));
  }
}

export function* watchFetchAnalytics() {
  yield takeLatest(FETCH_ANALYTICS, fetchAnalyticsSaga);
}
