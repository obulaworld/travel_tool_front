import { put, takeEvery, call } from 'redux-saga/effects';
import FileSaver from 'file-saver';

import {FETCH_CALENDAR_ANALYTICS} from '../constants/actionTypes';
import CalendarAnalyticsAPI from '../../services/TravelCalendarAPI';
import apiErrorHandler from '../../services/apiErrorHandler';

import {fetchCalendarAnalyticsSuccess, fetchCalendarAnalyticsFailure} from '../actionCreator/travelCalendarActions';

export function* fetchCalendarAnalyticsSaga(action) {
  try {
    const response = yield call(CalendarAnalyticsAPI.getCalendarAnalytics, action.query);
    if (action.query.type === 'file') {
      yield FileSaver.saveAs(response.data, 'Travel Calendar Analytics');
    } else {
      yield put(fetchCalendarAnalyticsSuccess(response.data));
    }
  }
  catch(error) {
    const errorMessage = apiErrorHandler(error);
    yield put(fetchCalendarAnalyticsFailure(errorMessage));
  }
}

export function* watchFetchCalendarAnalytics() {
  yield takeEvery(FETCH_CALENDAR_ANALYTICS, fetchCalendarAnalyticsSaga);
}
