import React from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';

import Map from '../components/common/Map';
import Menu from '../components/common/Menu';
import { MAPS_API } from '../constants/constants';

const HomePage = ({ userName }) => (
  <div className="home-page">
    <Menu user={userName} />
    <Map
      isMarkerShown
      googleMapURL={MAPS_API}
      loadingElement={<div className="maps-loading" />}
      containerElement={<div className="maps-container" />}
      mapElement={<div className="google-maps" />}
    />
  </div>
);

HomePage.propTypes = {
  userName: string.isRequired,
};

const mapStateToProps = state => ({
  userName: state.getIn(['session', 'user', 'firstName']),
});

export default connect(mapStateToProps)(HomePage);
