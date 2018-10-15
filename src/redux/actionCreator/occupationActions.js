import { FETCH_OCCUPATIONS, FETCH_OCCUPATIONS_SUCCESS, FETCH_ROLE_USERS_FAILURE } from '../constants/actionTypes';

export const getOccupation = () => ({
  type: FETCH_OCCUPATIONS,
});

export const fetchOccupationsSuccess = (occupations) => ({
  
  type: FETCH_OCCUPATIONS_SUCCESS,
  occupations,
});

export const fetchOccupationsFailure = ( error ) => ({
  type: FETCH_ROLE_USERS_FAILURE,
  error
});

