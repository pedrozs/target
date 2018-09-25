import React from 'react';
import { connect } from 'react-redux';

import Map from '../components/common/Map';
import Menu from '../components/common/Menu';

const HomePage = ({ user }) => (
  <div className="home-page">
    <Menu user={user} />
    <Map
      isMarkerShown
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBnJ1E5aZNOvGR1IPh_wH6j2wNffqFYm2s&v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: '100%' }} />}
      containerElement={<div style={{ width: '100%', height: '100%' }} />}
      mapElement={<div style={{ height: '100%' }} />}
    />
  </div>
);

const mapStateToProps = state => ({
  user: state.getIn(['session', 'user', 'firstName']),
});

export default connect(mapStateToProps)(HomePage);
