import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { bool, number } from 'prop-types';

import marker from '../../img/marker.svg';

const Map = withScriptjs(withGoogleMap(({ handleClick, isMarkerShown,
  coords, target }) => {
  const { latitude, longitude } = coords;
  return (
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
}));

Map.propTypes = {
  isMarkerShown: bool,
  latitude: number,
  longitude: number,
  new: bool
};

export default (Map);
