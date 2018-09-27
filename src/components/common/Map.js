import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { bool } from 'prop-types';

import marker from '../../img/marker.svg';

const Map = withScriptjs(withGoogleMap((props) => {
  let latitude = -34.901112;
  let longitude = -56.164532;
  navigator.geolocation.getCurrentPosition((position) => {
    ({ latitude, longitude } = position.coords);
  });
  const { isMarkerShown } = props;
  return (
    <GoogleMap
      defaultZoom={18}
      defaultCenter={{ lat: latitude, lng: longitude }}
    >
      {isMarkerShown &&
        <Marker
          icon={{ url: marker }}
          position={{ lat: latitude, lng: longitude }}
        />}
    </GoogleMap>);
}));

Map.propTypes = {
  isMarkerShown: bool,
};

export default (Map);
