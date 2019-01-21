import { put, takeLatest, call } from 'redux-saga/effects';
import toast from 'toastr';
import {
  createReminderEmailTemplateFailure,
  createReminderEmailTemplateSuccess
} from '../actionCreator/reminderManagementActions';
import apiErrorHandler from '../../services/apiErrorHandler';

import {CREATE_REMINDER_EMAIL_TEMPLATE} from '../constants/actionTypes';
import ReminderManagementAPI from '../../services/ReminderManagementAPI';

export function* createEmailReminderTemplateSaga(action){
  const { history, payload } = action;
  try{
    const response = yield call(ReminderManagementAPI.createEmailReminderTemplate, payload);
    yield put(createReminderEmailTemplateSuccess(response.data));
    toast.success(response.data.message);
    history.push('/settings/reminder-setup');
  }catch(error){
    const errors = {};
    if( error.response.status === 422){
      const { response: { data: { errors : validationErrors }}} = error;
      (validationErrors || []).forEach(error => {
        errors[error.name] = error.message;
      });
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
