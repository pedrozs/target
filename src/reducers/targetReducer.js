import { fromJS } from 'immutable';

import { GET_TARGETS_SUCCESS } from '../actions/actionTypes';

const initialState = fromJS([]);

const topics = (state = initialState, { type, targets }) => {
  switch (type) {
    case GET_TARGETS_SUCCESS: {
      return fromJS(targets);
    }
    default:
      return state;
  }
};

export default topics;
