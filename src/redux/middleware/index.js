import { all } from 'redux-saga/effects';
import { userAuth } from './userAuthSagas';
import {
  watchFetchRequests,
  watchCreateNewRequestAsync,
  watchFetchUserRequestsDetails,
  watchEditRequest,
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
import {
  watchCreateComment,
  watchEditComment,
  watchDeleteComment
} from './commentsSaga';
import {
  watchFetchApprovals,
  watchUpdateRequestStatus
} from './approvalsSaga';
import {
  watchFetchNotifications,
  watchAddNotification,
  watchUpdateAllNotificationStatus,
  markSingleNotificationAsReadSaga
} from './notificationsSaga';
import { watchUpdateUserProfileAsync } from './UserProfileSaga';
import {
  watchFetchAccommodation,
  watchFetchTimelneData
} from './accommodationSaga';

import { watchUpdateRoomsAsync } from './roomUpdateSaga';


import {
  watchFetchTrips,
  watchUpdateTrip
} from './tripsSaga';


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
    watchDeleteComment(),
    watchUpdateRequestStatus(),
    watchEditComment(),
    watchFetchNotifications(),
    watchUpdateRoomsAsync(),
    watchUpdateUserProfileAsync(),
    watchEditRequest(),
    watchAddNotification(),
    watchFetchAccommodation(),
    watchUpdateUserProfileAsync(),
    watchUpdateAllNotificationStatus(),
    watchFetchTimelneData(),
    markSingleNotificationAsReadSaga(),
    watchFetchTrips(),
    watchUpdateTrip()

  ]);
}

export default rootSaga;
