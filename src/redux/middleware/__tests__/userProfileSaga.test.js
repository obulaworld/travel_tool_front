import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import ProfileApi from '../../../services/ProfileApi';
import {watchUpdateUserProfileAsync} from '../UserProfileSaga';

const UserProfile = {
  passportName:'Collins Merita',
  department:'Talent development',
  occupation:'software developer',
  gender:'Male',
  manager:'samuel'
};

const id = 'JFENDVNDK';

describe('Profile saga', () =>{
  it('updates use profile data', () =>{
    return expectSaga(watchUpdateUserProfileAsync, ProfileApi)
      .provide([[call(ProfileApi.updateUserProfile, id), UserProfile]])
      .dispatch({
        type: 'UPDATE_USER_PROFILE',
        response: UserProfile,
        id
      })
      .run();
  });
});
