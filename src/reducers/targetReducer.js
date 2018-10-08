import { fromJS } from 'immutable';

import { GET_TARGETS_SUCCESS, DELETE_TARGET_SUCCESS } from '../actions/actionTypes';

const initialState = fromJS([]);

const topics = (state = initialState, { type, targets, index }) => {
  switch (type) {
    case GET_TARGETS_SUCCESS: {
      return fromJS(targets);
    }
    case DELETE_TARGET_SUCCESS: {
      return state.remove(index);
    }
    default:
      return state;
  }
};

export default topics;
