import React from 'react';
import { connect } from 'react-redux';
import { string, func, array, object } from 'prop-types';

import RouteFromPath from '../components/routes/RouteFromPath';
import history from '../utils/history';
import { getTopics } from '../actions/topicActions';
import Map from '../components/common/Map';
import { MAPS_API } from '../constants/constants';
import routes from '../constants/routesPaths';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coords: null,
      target: null
    };
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
            target={!this.props.match.isExact ? this.state.target : null}
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
  getTopics: func,
  match: object
};

const mapState = state => ({
  username: state.getIn(['session', 'user', 'username']),
});

const mapDispatch = dispatch => ({
  getTopics: () => dispatch(getTopics())
});

export default connect(mapState, mapDispatch)(HomePage);
