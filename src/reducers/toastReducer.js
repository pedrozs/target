import { fromJS } from 'immutable';

import { TOAST } from '../actions/actionTypes';

const initialState = fromJS({
  message: null,
  toast: false
});

const toast = (state = initialState, { type, message }) => {
  if (type === TOAST) {
    const aux = state.set('toast', fromJS(true));
    return aux.set('message', fromJS(message));
  }
  return state;
};

export default toast;
