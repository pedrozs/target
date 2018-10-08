import { fromJS } from 'immutable';

import { GET_TOPICS_SUCCESS } from '../actions/actionTypes';

const initialState = fromJS([]);

const topics = (state = initialState, { type, topics }) => {
  if (type === GET_TOPICS_SUCCESS) {
    state = fromJS(topics);
  }
  return state;
};

export default topics;
