import axios from '../helpers/http';
import {
  CREATE_ACTIVITY_SUCCESS,
  CREATE_ACTIVITY_FAILURE,
} from '../types';
import config from '../../config';

/**
 * MyActivities GET request action creator
 *
 * @param {Boolean} bool - boolean indicating whether the request is in progress
 * @return {Object} {{type: FETCH_MY_ACTIVITIES_REQUEST, bool: bool}}
 */
export const createActivityFailure = error => (
  {
    type: CREATE_ACTIVITY_FAILURE,
    error,
  }
);

/**
 * MyActivities GET request failure action creator
 *
 * @param {Boolean} bool - boolean indicating whether the request failed
 * @return {Object} {{type: FETCH_MY_ACTIVITIES_FAILURE, bool: bool}}
 */
export const createActivitySuccess = activity => (
  {
    type: CREATE_ACTIVITY_SUCCESS,
    activity,
  }
);

/**
 * fetch myActivities thunk
 * @param {string} - user id
 * @returns {(dispatch) => Promise<AxiosResponse>}
 */
export const createActivity = activity => (
  dispatch => axios.post(`${config.API_BASE_URL}/logged-activities`, activity)
    .then((response) => {
      dispatch(createActivitySuccess(response.data.data));
    })
    .catch(() => dispatch(createActivityFailure({})))
);
