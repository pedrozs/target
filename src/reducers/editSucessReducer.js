import { fromJS } from 'immutable';

import { EDIT_SUCCESS } from '../actions/actionTypes';
import { LOCATION_CHANGE } from './routerReducer';

const initialState = fromJS({
  success: false
});

const editSucess = (state = initialState, { type }) => {
  if (type === EDIT_SUCCESS) {
    return state.set('success', fromJS(true));
  } else if (type === LOCATION_CHANGE) {
    return state.set('success', fromJS(false));
  }
  return state;
};

export default editSucess;
