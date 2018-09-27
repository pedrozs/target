import React from 'react';
import { connect } from 'react-redux';
import { string, object } from 'prop-types';
import { ToastContainer, ToastStore } from 'react-toasts';

import Map from '../components/common/Map';
import Menu from '../components/common/Menu';
import { MAPS_API } from '../constants/constants';

const HomePage = ({ toast, username }) => {
  if (toast.toast) {
    ToastStore.success(toast.message, 3000);
  }
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
  username: string.isRequired,
  toast: object
};

const mapStateToProps = state => ({
  username: state.getIn(['session', 'user', 'username']),
  toast: state.getIn(['toast']).toJS()
});

export default connect(mapStateToProps)(HomePage);
