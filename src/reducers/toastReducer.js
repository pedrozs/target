import { fromJS } from 'immutable';

import { TOAST, TOASTED } from '../actions/actionTypes';

const initialState = fromJS({
  message: null,
  toast: false
});

const toast = (state = initialState, { type, message }) => {
  if (type === TOAST) {
    const aux = state.set('toast', fromJS(true));
    return aux.set('message', fromJS(message));
  } else if (type === TOASTED) {
    return state.set('toast', fromJS(false));
  }
  return state;
};

export default toast;
