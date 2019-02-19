import { put, takeLatest, call } from 'redux-saga/effects';
import toast from 'toastr';
import {
  CREATE_TRAVEL_STIPEND,
  FETCH_ALL_TRAVEL_STIPENDS
} from '../constants/actionTypes';
import TravelStipendsAPI from '../../services/TravelStipendsAPI';
import apiErrorHandler from '../../services/apiErrorHandler';
import {
  createTravelStipendSuccess,
  createTravelStipendFailure,
  fetchAllTravelStipendsFailure,
  fetchAllTravelStipendsSuccess
} from '../actionCreator/travelStipendsActions';
import { closeModal } from '../actionCreator/modalActions';

export function* createTravelStipendSagaAsync(action) {
  const { history } = action;
  try {
    const response = yield call(
      TravelStipendsAPI.postTravelStipend, action.requestData
    );
    yield put(createTravelStipendSuccess(response.data));
    toast.success(response.data.message);
    yield put(closeModal());
    history.push('/settings/travelStipends');
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(createTravelStipendFailure(errorMessage));
    toast.error(errorMessage);
  }
}

export function* watchCreateTravelStipendAsync() {
  yield takeLatest(CREATE_TRAVEL_STIPEND, createTravelStipendSagaAsync);
}

export function* getAllTravelStipendsSaga(){
  try{
    const result = yield call(TravelStipendsAPI.getAllTravelStipends);
    yield put(fetchAllTravelStipendsSuccess(result.data));
  }catch(errors){  
    let errorMessage = apiErrorHandler(errors);
    yield put(fetchAllTravelStipendsFailure(errorMessage));
  }
}

export function* watchgetAllTravelStipends(){
  yield takeLatest(FETCH_ALL_TRAVEL_STIPENDS, getAllTravelStipendsSaga);
}
