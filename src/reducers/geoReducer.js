import { fromJS } from 'immutable';

import { UPDATE_LOC } from '../actions/actionTypes';

const initialState = fromJS({
  coords: {
    latitude: -34.901112,
    longitude: -56.201296
  }
});

const geo = (state = initialState, { type, coords }) => {
  if (type === UPDATE_LOC) {
    const { latitude, longitude } = coords;
    return state.set('coords', fromJS({ latitude, longitude }));
  }
  return state;
};

export default geo;
