import React from 'react';
import { connect } from 'react-redux';
import { string, func, array } from 'prop-types';

import RouteFromPath from '../components/routes/RouteFromPath';
import history from '../utils/history';
import { getTopics } from '../actions/sessionActions';
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
    this.props.getTopics();
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
        {this.props.subRoutes && this.props.subRoutes.map((route, index) =>
          <RouteFromPath key={index} {...route} />)}
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
      </div>
    );
  }
}

HomePage.propTypes = {
  username: string,
  edit: func,
  subRoutes: array,
  getTopics: func
};

const mapState = state => ({
  username: state.getIn(['session', 'user', 'username']),
});

const mapDispatch = dispatch => ({
  getTopics: () => dispatch(getTopics())
});

export default connect(mapState, mapDispatch)(HomePage);
