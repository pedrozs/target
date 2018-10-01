import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { bool, number } from 'prop-types';
import { connect } from 'react-redux';

import marker from '../../img/marker.svg';

const Map = withScriptjs(withGoogleMap(({ isMarkerShown, lat, lng }) => (
  <GoogleMap
    defaultZoom={18}
    defaultCenter={{ lat, lng }}
  >
    {isMarkerShown &&
      <Marker
        icon={{ url: marker }}
        position={{ lat, lng }}
      />}
  </GoogleMap>)));

Map.propTypes = {
  isMarkerShown: bool,
  lat: number,
  lng: number
};

const mapStateToProps = state => ({
  lat: state.getIn(['geo', 'coords', 'latitude']),
  lng: state.getIn(['geo', 'coords', 'longitude'])
});

export default connect(mapStateToProps)(Map);
