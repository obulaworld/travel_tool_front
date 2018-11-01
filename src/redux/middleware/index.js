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
import { watchFetchRoleUsers, watchDeleteUserRoleAsync } from './roleSaga';
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
  watchCreateAccommodationSagaAsync,
  watchFetchAccommodation,
  watchFetchTimelneData,
  watchEditAccommodation,
} from './accommodationSaga';

import { watchFetchOccupations } from './occupationSaga';

import { watchFetchAvailableRooms } from './availableRoomsSaga';

import { watchUpdateRoomsAsync } from './roomUpdateSaga';

import {
  watchFetchTrips,
  watchUpdateTrip,
  watchUpdateTripRoom
} from './tripsSaga';
import {
  watchCreateChecklist,
  watchFetchAllChecklists,
  watchUpdateChecklist,
  watchDeleteChecklist,
  watchFetchDeletedChecklistItems,
} from './travelChecklistSaga';

import {
  watchFetchCenters,
  watchUpdateUserCenterAsync
} from './centersSaga';
import { watchFetchAnalytics } from './analyticsSaga';

import {
  watchFetchDepartmentTrips
} from './tripsAnalyticsSaga';

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
    watchEditAccommodation(),
    watchUpdateAllNotificationStatus(),
    watchCreateAccommodationSagaAsync(),
    watchFetchTimelneData(),
    markSingleNotificationAsReadSaga(),
    watchFetchTrips(),
    watchUpdateTrip(),
    watchFetchOccupations(),
    watchFetchAllChecklists(),
    watchUpdateChecklist(),
    watchCreateChecklist(),
    watchDeleteChecklist(),
    watchFetchCenters(),
    watchUpdateUserCenterAsync(),
    watchFetchDeletedChecklistItems(),
    watchFetchAvailableRooms(),
    watchUpdateTripRoom(),
    watchFetchAnalytics(),
    watchDeleteUserRoleAsync(),
    watchFetchDepartmentTrips()
  ]);
}

export default rootSaga;
