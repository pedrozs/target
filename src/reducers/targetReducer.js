import { fromJS } from 'immutable';

import { GET_TARGETS_SUCCESS } from '../actions/actionTypes';

const initialState = fromJS([]);

const topics = (state = initialState, { type, targets }) => {
  if (type === GET_TARGETS_SUCCESS) {
    state = fromJS(targets);
  }
  return state;
};

export default topics;
