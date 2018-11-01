import { put, takeLatest, takeEvery, call } from 'redux-saga/effects';
import FileSaver from 'file-saver';
import ReadinessAPI from '../../services/ReadinessAPI';
import apiErrorHandler from '../../services/apiErrorHandler';
import { FETCH_TRAVEL_READINESS } from '../constants/actionTypes';
import { fetchReadinessSuccess, fetchReadinessfailure } from '../actionCreator/travelReadinessActions';

//fetch Travel Readiness from API and dispatch action to get this data to store via reducer
export function* fetchReadinessSaga(action){
  try{
    const response = yield call(ReadinessAPI.getTravelReadiness, action.query);
    if (action.query.type === 'file') {
      yield FileSaver.saveAs(response.data, 'Travel readiness for all travelers');
    } else {
      yield put(fetchReadinessSuccess(response.data.readiness));
    }
  }catch(error){
    let errorMessage = apiErrorHandler(error);
    yield put(fetchReadinessfailure(errorMessage));
  }
}

export function* watchFetchReadiness(){
  yield takeEvery(FETCH_TRAVEL_READINESS, fetchReadinessSaga);
}

















