import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { bool } from 'prop-types';

import marker from '../../img/marker.svg';

const Map = withScriptjs(withGoogleMap((props) => {
  let latitude;
  let longitude;
  navigator.geolocation.getCurrentPosition((position) => {
    ({ latitude, longitude } = position.coords);
  });
  const { isMarkerShown } = props;
  return (
    <GoogleMap
      defaultZoom={18}
      defaultCenter={{ lat: latitude || -34.901112, lng: longitude || -56.164532 }}
    >
      {isMarkerShown &&
        <Marker
          icon={{ url: marker }}
          position={{ lat: latitude || -34.901112, lng: longitude || -56.164532 }}
        />}
    </GoogleMap>);
}));

Map.propTypes = {
  isMarkerShown: bool,
};

export default (Map);
