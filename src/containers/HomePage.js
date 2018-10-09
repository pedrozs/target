import React from 'react';
import { connect } from 'react-redux';
import { string, func, array, object } from 'prop-types';

import TargetForm from '../components/user/TargetForm';
import RouteFromPath from '../components/routes/RouteFromPath';
import history from '../utils/history';
import { getTopics } from '../actions/topicActions';
import { getTargets } from '../actions/targetActions';
import Map from '../components/common/Map';
import { MAPS_API } from '../constants/constants';
import routes from '../constants/routesPaths';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coords: null,
      target: null,
    };
  }

  componentDidMount() {
    const { getTopics, getTargets } = this.props;
    getTopics();
    getTargets();
    navigator.geolocation.getCurrentPosition((position) => {
      const { coords } = position;
      this.setState({ coords });
    });
  }

  setTargetRadius = ({ target: { value } }) => {
    this.setState({
      target: { ...this.state.target, radius: Number(value) }
    });
  }

  mapClick = ({ latLng }) => {
    this.setState({
      target: { lat: latLng.lat(), lng: latLng.lng() }
    });
    if (this.props.match.isExact) history.push(routes.newTarget);
  }

  render() {
    const { location, subRoutes, targets } = this.props;
    const { target, coords } = this.state;
    return (
      <div className="home-page">
        {/* propless routes */}
        {subRoutes && subRoutes.map((route, index) =>
          <RouteFromPath key={index} {...route} />)}
        {/* routes with props */}
        <RouteFromPath
          path={routes.newTarget}
          render={props => (
            <TargetForm
              {...props}
              setTargetRadius={this.setTargetRadius}
              initialValues={target}
            />)}
        />
        {this.state.coords &&
          <Map
            isMarkerShown
            googleMapURL={MAPS_API}
            loadingElement={<div className="maps-loading" />}
            containerElement={<div className="maps-container" />}
            mapElement={<div className="google-maps" />}
            handleClick={this.mapClick}
            target={(location.pathname == '/create-target') ? target : null}
            coords={coords}
            targets={targets}
          />
        }
      </div>
    );
  }
}

HomePage.propTypes = {
  edit: func,
  getTargets: func,
  getTopics: func,
  location: object,
  match: object,
  subRoutes: array,
  targets: array,
  username: string,
};

const mapState = state => ({
  targets: state.getIn(['target']).toJS(),
  username: state.getIn(['session', 'user', 'username']),
});

const mapDispatch = dispatch => ({
  getTargets: () => dispatch(getTargets()),
  getTopics: () => dispatch(getTopics())
});

export default connect(mapState, mapDispatch)(HomePage);
