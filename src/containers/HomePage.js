import React from 'react';
import { connect } from 'react-redux';
import { string, func, array, object } from 'prop-types';
import { FormattedMessage } from 'react-intl';

import TargetForm from '../components/user/TargetForm';
import RouteFromPath from '../components/routes/RouteFromPath';
import history from '../utils/history';
import { getTopics } from '../actions/topicActions';
import { getTargets, deleteTarget } from '../actions/targetActions';
import Map from '../components/common/Map';
import { MAPS_API } from '../constants/constants';
import routes from '../constants/routesPaths';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coords: null,
      target: null,
      selectedTarget: null,
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

  selectTarget = (index) => {
    if (!this.props.match.isExact) history.push(routes.index);
    this.setState({
      selectedTarget: index,
    });
  }

  deleteSelectedTarget = () => {
    const selectedTargetID = this.props.targets[this.state.selectedTarget].target.id;
    this.props.deleteTarget({ id: selectedTargetID, index: this.state.selectedTarget });
    this.setState({
      selectedTarget: null
    });
  }

  mapClick = ({ latLng }) => {
    this.setState({
      target: { lat: latLng.lat(), lng: latLng.lng() },
      selectedTarget: null
    });
    if (this.props.match.isExact) history.push(routes.newTarget);
  }

  render() {
    const { location, subRoutes, targets } = this.props;
    const { target, coords, selectedTarget } = this.state;
    return (
      <div className="home-page">
        {this.state.selectedTarget != undefined &&
          <div onClick={this.deleteSelectedTarget} className="delete-target"> <FormattedMessage id="target.delete" /> </div>
        }
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
<<<<<<< HEAD
            target={(location.pathname == routes.newTarget) ? target : null}
=======
<<<<<<< HEAD
            target={(location.pathname == '/create-target') ? target : null}
>>>>>>> 74f852266ec42aff32a1ede7597a917aec6bec32
            coords={coords}
            targets={targets}
            selectTarget={this.selectTarget}
            selectedTarget={selectedTarget}
<<<<<<< HEAD
=======
=======
            target={(this.props.location.pathname == '/create-target') ? this.state.target : null}
            coords={this.state.coords}
            targets={this.props.targets}
            selectTarget={this.selectTarget}
            selectedTarget={this.state.selectedTarget}
>>>>>>> ca461dda7bec0478d125c3a6bceee625009178e3
>>>>>>> 74f852266ec42aff32a1ede7597a917aec6bec32
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
  deleteTarget: func,
};

const mapState = state => ({
  targets: state.getIn(['target']).toJS(),
  username: state.getIn(['session', 'user', 'username']),
});

const mapDispatch = dispatch => ({
  getTargets: () => dispatch(getTargets()),
  getTopics: () => dispatch(getTopics()),
  deleteTarget: target => dispatch(deleteTarget(target)),
});

export default connect(mapState, mapDispatch)(HomePage);
