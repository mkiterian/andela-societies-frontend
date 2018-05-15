import {
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
  case CREATE_ACTIVITY_SUCCESS:
    return { ...state, activities: state.activities.concat(action.activity) };
  default:
    return state;
  }
};

export default myActivities;
