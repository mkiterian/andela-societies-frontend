import {
  FETCH_MY_ACTIVITIES_REQUEST,
  FETCH_MY_ACTIVITIES_SUCCESS,
  FETCH_MY_ACTIVITIES_FAILURE,
  CREATE_ACTIVITY_SUCCESS,
  CREATE_ACTIVITY_FAILURE,
} from '../types';
import initialState from './initialState';

/**
 * myActivities reducer
 *
 * @param {Object} state myActivities initial state
 * @param {Object} action
 * @returns {Object} myActivities state
 */
const myActivities = (state = initialState.myActivities, action) => {
  switch (action.type) {
  case FETCH_MY_ACTIVITIES_REQUEST:
    return { ...state, requesting: action.requesting };
  case FETCH_MY_ACTIVITIES_FAILURE:
    return { ...state, failed: action.failed };
  case FETCH_MY_ACTIVITIES_SUCCESS:
    return { ...state, activities: action.activities };
  case CREATE_ACTIVITY_SUCCESS:
    return { ...state, activities: state.activities.concat(action.activity) };
  case CREATE_ACTIVITY_FAILURE:
    return { ...state, error: action.error };
  default:
    return state;
  }
};

export default myActivities;
