import { fromJS } from 'immutable';

import { GET_CONVERSATION_SUCCESS } from '../actions/actionTypes';

const initialState = fromJS([]);

const topics = (state = initialState, { type, conversations }) => {
  switch (type) {
    case GET_CONVERSATION_SUCCESS: {
      return fromJS(conversations);
    }
    default:
      return state;
  }
};

export default topics;
