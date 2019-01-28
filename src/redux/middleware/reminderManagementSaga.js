import { put, takeLatest, call } from 'redux-saga/effects';
import toast from 'toastr';
import {
  createReminderEmailTemplateFailure,
  createReminderEmailTemplateSuccess,
  enableReminderEmailTemplateFailure,
  enableReminderEmailTemplateSuccess,
  disableEmailTemplateSuccess,
  disableEmailTemplateFailure,
} from '../actionCreator/reminderManagementActions';
import apiErrorHandler from '../../services/apiErrorHandler';

import {CREATE_REMINDER_EMAIL_TEMPLATE,
  ENABLE_REMINDER_EMAIL_TEMPLATE, DISABLE_EMAIL_TEMPLATE
} from '../constants/actionTypes';
import ReminderManagementAPI from '../../services/ReminderManagementAPI';
import apiValidationErrorHandler from '../../services/apiValidationErrorHandler';
import { closeModal } from '../actionCreator/modalActions';

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

export function* enableEmailReminderTemplateSaga(action){
  try{
    const { templateId } = action;
    const response = yield call(ReminderManagementAPI.enableEmailTemplates, templateId);
    yield put(enableReminderEmailTemplateSuccess(response.data.updatedTemplate, templateId));
    yield put(closeModal());
    toast.success(response.data.message);
  }catch(error){
    let errorMessage = apiErrorHandler(error);
    toast.error(errorMessage);
    yield put(enableReminderEmailTemplateFailure(error));
  }
}

export function* watchEnableEmailReminderTemplate(){
  yield takeLatest(ENABLE_REMINDER_EMAIL_TEMPLATE, enableEmailReminderTemplateSaga);
}
export function* disableEmailTemplateAsync(action) {
  try {
    const { templateId, disableReason } = action;
    const response = yield call(ReminderManagementAPI.disableEmailTemplate,
      {templateId, disableReason});
    yield put(disableEmailTemplateSuccess(response.data.updatedTemplate, response.data.reason));
    toast.success(response.data.message);
    yield put(closeModal());
  }
  catch(error) {
    const errorMessage = apiErrorHandler(error);
    yield put(disableEmailTemplateFailure(errorMessage));
    toast.error(errorMessage);
  }
}

export function* watchdisableEmailTemplate() {
  yield takeLatest(DISABLE_EMAIL_TEMPLATE, disableEmailTemplateAsync);
}

