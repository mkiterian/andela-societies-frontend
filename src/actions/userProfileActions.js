import http from '../helpers/http';

import {
  FETCH_USER_PROFILE_REQUEST,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_FAILURE,
} from '../types';
// import config from '../../config';

/**
 * @function requestUserProfile
 * @return {Object} {{type: FETCH_USER_PROFILE_REQUEST}}
 */
export const requestUserProfile = () => (
  {
    type: FETCH_USER_PROFILE_REQUEST,
  }
);

/**
 * @function requestUserProfileSuccess
 * @param {Object} profile - object with detailed user information
 * @return {Object} {{type: FETCH_USER_PROFILE_SUCCESS, profile}}
 */
export const requestUserProfileSuccess = profile => (
  {
    type: FETCH_USER_PROFILE_SUCCESS,
    profile,
  }
);

/**
 * @function requestUserProfileFailure
 * @param error - object with error information
 * @return {Object} {{type: FETCH_USER_PROFILE_FAILURE, error}}
 */
export const requestUserProfileFailure = error => (
  {
    type: FETCH_USER_PROFILE_FAILURE,
    error,
  }
);

/**
 * @function fetchUserProfile thunk
 * @returns {(dispatch) => Promise<AxiosResponse>}
 */
export const fetchUserProfile = id => (
  (dispatch) => {
    dispatch(requestUserProfile());
    return http.get(`https://private-ae5c2-andelasocietiesapi.apiary-mock.com/api/v1/users/${id}`)
      .then((response) => {
        dispatch(requestUserProfileSuccess(response.data.data));
      })
      .catch(error => dispatch(requestUserProfileFailure(error)));
  }
);
