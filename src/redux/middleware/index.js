import { all } from 'redux-saga/effects';
import { userAuth } from './userAuthSagas';
import {
  watchFetchRequests,
  watchCreateNewRequestAsync,
  watchFetchUserRequestsDetails
} from './requestsSaga';
import {
  watchPostUserDataSagaAsync,
  watchGetUserDataSagaAsync
} from './userDataSaga';
import {
  watchGetRoleDataSagaAsync,
  watchPutRoleDataSagaAsync
} from './roleDataSaga';
import { watchFetchRoleUsers } from './roleSaga';
import { watchCreateComment, watchEditComment } from './commentsSaga';
import {
  watchFetchApprovals,
  watchUpdateRequestStatus,
} from './approvalsSaga';
import { watchFetchNotifications, watchAddNotifications } from './notificationSaga';

import { watchUpdateUserProfileAsync } from './UserProfileSaga';



function* rootSaga() {
  yield all([
    userAuth(),
    watchFetchRequests(),
    watchFetchApprovals(),
    watchCreateNewRequestAsync(),
    watchPostUserDataSagaAsync(),
    watchGetUserDataSagaAsync(),
    watchGetRoleDataSagaAsync(),
    watchPutRoleDataSagaAsync(),
    watchFetchRoleUsers(),
    watchFetchUserRequestsDetails(),
    watchCreateComment(),
    watchUpdateRequestStatus(),
    watchUpdateUserProfileAsync(),
    watchFetchNotifications(),
    watchAddNotifications(),
    watchFetchNotifications(),
    watchAddNotifications(),
    watchEditComment(),
  ]);
}

export default rootSaga;
