import { fromJS } from 'immutable';

import { UPDATE_LOC } from '../actions/actionTypes';

const initialState = fromJS({
  latitude: -34.901112,
  longitude: -34.901112
});

const editSucess = (state = initialState, { type, latitude, longitude }) => {
  if (type === UPDATE_LOC) {
    const aux = state.set('latitude', fromJS(latitude));
    return aux.set('longitude', fromJS(longitude));
  }
  return state;
};

export default editSucess;
