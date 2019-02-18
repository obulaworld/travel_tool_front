import { put, takeLatest, call } from 'redux-saga/effects';
import toast from 'toastr';
import {
  createTravelReasonSuccess,
  createTravelReasonFailure
} from '../actionCreator/travelReasonsActions';

import {
  CREATE_TRAVEL_REASON,
} from '../constants/actionTypes';

import TravelReasonsAPI from '../../services/TravelReasonsAPI';
import { closeModal } from '../actionCreator/modalActions';

export function* createTravelReasonsSaga(action) {
  const { body, history } = action;
  try {
    const response = yield call(TravelReasonsAPI.createTravelReasons, body);
    yield put(createTravelReasonSuccess(response.data));
    toast.success(response.data.message);
    yield put(closeModal());
    history.push('/settings/travel-reason');
  } catch(error){
    toast.error(error.response.data.message);
    yield put(createTravelReasonFailure(error.response.data));
  }
}

export function* watchCreateTravelReason(){
  yield takeLatest(CREATE_TRAVEL_REASON, createTravelReasonsSaga);
}
