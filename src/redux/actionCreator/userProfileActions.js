import {UPDATE_USER_PROFILE}from '../constants/actionTypes';


const updateUserProfile = (userProfileData, userId) =>(
  {
    type: UPDATE_USER_PROFILE,
    userProfileData,
    userId
  });


export default updateUserProfile;
