import { put, takeLatest, call } from 'redux-saga/effects';
import toast from 'toastr';
import {
  createReminderEmailTemplateFailure,
  createReminderEmailTemplateSuccess
} from '../actionCreator/reminderManagementActions';
import apiErrorHandler from '../../services/apiErrorHandler';

import {CREATE_REMINDER_EMAIL_TEMPLATE} from '../constants/actionTypes';
import ReminderManagementAPI from '../../services/ReminderManagementAPI';
import apiValidationErrorHandler from '../../services/apiValidationErrorHandler';

export function* createEmailReminderTemplateSaga(action){
  const { history, payload } = action;
  try{
    const response = yield call(ReminderManagementAPI.createEmailReminderTemplate, payload);
    yield put(createReminderEmailTemplateSuccess(response.data));
    toast.success(response.data.message);
    history.push('/settings/reminder-setup');
  }catch(error){
    let errors = {};
    if( error.response.status === 422){
      errors = apiValidationErrorHandler(error);
    }else{
      let errorMessage = apiErrorHandler(error);
      toast.error(errorMessage);
    }
    yield put(createReminderEmailTemplateFailure(errors));
  }
}

export function* watchCreateEmailReminderTemplate(){
  yield takeLatest(CREATE_REMINDER_EMAIL_TEMPLATE, createEmailReminderTemplateSaga);
}
