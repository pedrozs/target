import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { bool, object } from 'prop-types';
import { geolocated } from 'react-geolocated';

import marker from '../../img/marker.svg';

const Map = withScriptjs(withGoogleMap((props) => {
  const { latitude, longitude } = props.coords;
  return (
    <GoogleMap
      defaultZoom={18}
      defaultCenter={{ lat: latitude || -34.901112, lng: longitude || -56.164532 }}
    >
      {props.isMarkerShown && <Marker icon={{ url: marker }} position={{ lat: latitude || -34.901112, lng: longitude || -56.164532 }} />}
    </GoogleMap>);
}));

Map.propTypes = {
  isMarkerShown: bool,
  coords: object,
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000 })(Map);
