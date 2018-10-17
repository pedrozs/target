import React from 'react';
import { connect } from 'react-redux';
import { string, func, array, object } from 'prop-types';
import { FormattedMessage } from 'react-intl';
// import { ActionCableProvider } from 'react-actioncable-provider';

import Menu from '../components/common/Menu';
import Chat from '../components/user/Chat';
import TargetForm from '../components/user/TargetForm';
import RouteFromPath from '../components/routes/RouteFromPath';
import history from '../utils/history';
import { getTopics } from '../actions/topicActions';
import { getTargets, deleteTarget } from '../actions/targetActions';
import { getConversations } from '../actions/conversationsActions';
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
      activeConversation: null
    };
  }

  componentDidMount() {
    const { getTopics, getTargets, getConversations } = this.props;
    getConversations();
    getTopics();
    getTargets();
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { coords } = position;
        this.setState({ coords });
      });
    } else {
      this.setState({ coords: { lat: -34.901112, lng: -56.164532 } });
    }
  }

  setTargetRadius = ({ target: { value } }) => {
    this.setState({
      target: { ...this.state.target, radius: Number(value) }
    });
  }

  setActiveConversation = (index) => {
    this.setState({
      activeConversation: index
    });
  }

  mapClick = ({ latLng }) => {
    this.setState({
      target: { lat: latLng.lat(), lng: latLng.lng() },
      selectedTarget: null
    });
    if (this.props.match.isExact) history.push(routes.newTarget);
  }

  deleteSelectedTarget = () => {
    const selectedTargetID = this.props.targets[this.state.selectedTarget].target.id;
    this.props.deleteTarget({ id: selectedTargetID, index: this.state.selectedTarget });
    this.setState({
      selectedTarget: null
    });
  }

  selectTarget = (index) => {
    if (!this.props.match.isExact) history.push(routes.index);
    this.setState({
      selectedTarget: index,
    });
  }

  render() {
    const { location, subRoutes, targets } = this.props;
    const { target, coords, selectedTarget, activeConversation } = this.state;
    return (
      <div className="home-page">
        {selectedTarget != undefined &&
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

        <RouteFromPath
          path={routes.index}
          exact
          render={props => (
            <Menu
              {...props}
              setActiveConversation={this.setActiveConversation}
            />
          )}
        />

        <RouteFromPath
          path={routes.chat}
          exact
          render={props => (
            // <ActionCableProvider url={process.env.API_WS_URL}>
              <Chat
                {...props}
                activeConversation={activeConversation}
              />
            // </ActionCableProvider>
          )}
        />

        {/* Map component */}
        {this.state.coords &&
          <Map
            isMarkerShown
            googleMapURL={MAPS_API}
            loadingElement={<div className="maps-loading" />}
            containerElement={<div className="maps-container" />}
            mapElement={<div className="google-maps" />}
            handleClick={this.mapClick}
            target={(location.pathname == routes.newTarget) ? target : null}
            coords={coords}
            targets={targets}
            selectTarget={this.selectTarget}
            selectedTarget={selectedTarget}
          />
        }
      </div>
    );
  }
}

HomePage.propTypes = {
  edit: func,
  getConversations: func,
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
  deleteTarget: target => dispatch(deleteTarget(target)),
  getConversations: () => dispatch(getConversations()),
  getTargets: () => dispatch(getTargets()),
  getTopics: () => dispatch(getTopics()),
});

export default connect(mapState, mapDispatch)(HomePage);
