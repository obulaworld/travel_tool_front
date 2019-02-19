import {takeLatest, call, put} from 'redux-saga/effects';
import toast from 'toastr';
import {FETCH_ALL_TRAVEL_STIPENDS} from '../constants/actionTypes';
import {fetchAllTravelStipendsFailure, fetchAllTravelStipendsSuccess} from '../actionCreator/travelStipendsActions';
import apiErrorHandler from '../../services/apiErrorHandler';
import TravelStipendsAPI from '../../services/TravelStipendsAPI';

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

