import { fromJS } from 'immutable';

import { GET_TOPICS_SUCESS } from '../actions/actionTypes';

const initialState = fromJS([]);

const topics = (state = initialState, { type, topics }) => {
  if (type === GET_TOPICS_SUCESS) {
    state = fromJS(topics);
  }
  return state;
};

export default topics;
