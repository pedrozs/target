import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { object, bool, func } from 'prop-types';

import marker from '../../img/marker.svg';

const Map = ({ handleClick, isMarkerShown, coords: { latitude, longitude }, target }) => (
  <GoogleMap
    onClick={handleClick}
    defaultZoom={18}
    defaultCenter={{ lat: latitude, lng: longitude }}
  >
    {isMarkerShown &&
      <Marker
        icon={{ url: marker }}
        position={{ lat: latitude, lng: longitude }}
      />}
    {target &&
      <Marker
        icon={{ url: marker }}
        position={{ lat: target.lat, lng: target.lng }}
      />
    }
  </GoogleMap>);

Map.propTypes = {
  coords: object,
  handleClick: func,
  isMarkerShown: bool,
  target: object,
};

export default withScriptjs(withGoogleMap(Map));
