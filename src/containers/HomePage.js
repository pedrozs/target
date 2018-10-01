import React from 'react';
import { connect } from 'react-redux';
import { string, object, func } from 'prop-types';
import { ToastContainer, ToastStore } from 'react-toasts';

import { toasted, updateLoc } from '../actions/sessionActions';
import Map from '../components/common/Map';
import Menu from '../components/common/Menu';
import { MAPS_API } from '../constants/constants';

const HomePage = ({ updateLoc, toast, toasted, username }) => {
  if (toast.toast) {
    ToastStore.success(toast.message, 3000);
    toasted();
  }
  navigator.geolocation.watchPosition((position) => {
    updateLoc(position.coords);
  });
  return (
    <div className="home-page">
      <Menu username={username} />
      <Map
        isMarkerShown
        googleMapURL={MAPS_API}
        loadingElement={<div className="maps-loading" />}
        containerElement={<div className="maps-container" />}
        mapElement={<div className="google-maps" />}
      />
      <ToastContainer store={ToastStore} />
    </div>
  );
};

HomePage.propTypes = {
  username: string,
  toast: object,
  toasted: func,
  updateLoc: func
};

const mapStateToProps = state => ({
  username: state.getIn(['session', 'user', 'username']),
  toast: state.getIn(['toast']).toJS()
});

const mapDispatchToProps = dispatch => ({
  toasted: () => dispatch(toasted),
  updateLoc: coords => dispatch(updateLoc(coords))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
