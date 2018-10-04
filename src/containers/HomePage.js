import React from 'react';
import { connect } from 'react-redux';
import { string, func, array } from 'prop-types';
import { ToastContainer, ToastStore } from 'react-toasts';

import RouteFromPath from '../components/routes/RouteFromPath';
import history from '../utils/history';
import { editUser } from '../actions/sessionActions';
import Map from '../components/common/Map';
import { MAPS_API } from '../constants/constants';
import routes from '../constants/routesPaths';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.coords = null;
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      const { coords } = position;
      this.setState({ coords });
    });
  }

  mapClick = ({ latLng }) => {
    this.setState({
      target: { lat: latLng.lat(), lng: latLng.lng() }
    });
    history.push(routes.newTarget);
  }

  eraseTarget = () => {
    this.setState({
      target: null
    });
  }

  render() {
    return (
      <div className="home-page">
        {this.props.subRoutes && this.props.subRoutes.map((route, index) => <RouteFromPath key={index} {...route} />)}
        {this.state.coords &&
          <Map
            isMarkerShown
            googleMapURL={MAPS_API}
            loadingElement={<div className="maps-loading" />}
            containerElement={<div className="maps-container" />}
            mapElement={<div className="google-maps" />}
            handleClick={this.mapClick}
            target={this.state.target}
            coords={this.state.coords}
          />
        }
        <ToastContainer store={ToastStore} />
      </div>
    );
  }
}

HomePage.propTypes = {
  username: string,
  edit: func,
  subRoutes: array
};

const mapState = state => ({
  username: state.getIn(['session', 'user', 'username']),
  toast: state.getIn(['toast']).toJS(),
});

const mapDispatch = dispatch => ({
  edit: user => dispatch(editUser(user.toJS())),
});

export default connect(mapState, mapDispatch)(HomePage);
