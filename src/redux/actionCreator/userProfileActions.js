import {UPDATE_PROFILE_SUCCESS, UPDATE_USER_PROFILE} from '../constants/actionTypes';

const updateUserProfile = (userProfileData, userId, showToast) =>(
  {
    type: UPDATE_USER_PROFILE,
    userProfileData,
    userId,
    showToast
  });


export const updateUserProfileSuccess = response => ({
  type: UPDATE_PROFILE_SUCCESS,
  response
});

export default updateUserProfile;
