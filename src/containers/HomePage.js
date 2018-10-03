import React from 'react';
import { connect } from 'react-redux';
import { string, func } from 'prop-types';
import { ToastContainer, ToastStore } from 'react-toasts';
import { Route } from 'react-router-dom';

import history from '../utils/history';
import { editUser } from '../actions/sessionActions';
import Map from '../components/common/Map';
import Menu from '../components/common/Menu';
import EditForm from '../components/user/EditForm';
import TargetForm from '../components/user/TargetForm';
import { MAPS_API } from '../constants/constants';
import routes from '../constants/routesPaths';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      const { coords } = position;
      this.setState({
        coords
      });
    });
  }

  mapClick = ({ latLng }) => {
    this.setState({
      target: {
        lat: latLng.lat(),
        lng: latLng.lng(),
      }
    });
    history.push(routes.newTarget);
  }

  eraseTarget = () => {
    this.setState({
      target: null
    });
  }

  render() {
    const { username, edit } = this.props;
    return (
      <div className="home-page">
        <Route
          exact path={routes.index}
          render={() => (
            <Menu username={username} />
          )}
        />
        <Route
          path={routes.editUser}
          render={() => (
            <EditForm onSubmit={edit} />
          )}
        />
        <Route
          path={routes.newTarget}
          render={() => (
            <TargetForm
              eraseTarget={this.eraseTarget}
              target={this.state.target}
            />
          )}
        />
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
  edit: func
};

const mapState = state => ({
  username: state.getIn(['session', 'user', 'username']),
  toast: state.getIn(['toast']).toJS(),
});

const mapDispatch = dispatch => ({
  edit: user => dispatch(editUser(user.toJS())),
});

export default connect(mapState, mapDispatch)(HomePage);
