import React from 'react';
import { connect } from 'react-redux';
import { object, func, bool } from 'prop-types';
import { Redirect } from 'react-router-dom';

import Map from '../components/common/Map';
import EditForm from '../components/user/EditForm';
import { editUser } from '../actions/sessionActions';
import routes from '../constants/routesPaths';

const EditUserPage = ({ success, user, edit }) => {
  if (success) {
    return (<Redirect to={routes.index} />);
  }

  return (
    <div className="home-page">
      <EditForm user={user} onSubmit={edit} />
      <Map
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBnJ1E5aZNOvGR1IPh_wH6j2wNffqFYm2s&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ width: '100%', height: '100%' }} />}
        mapElement={<div className="google-maps" />}
      />
    </div>);
};

EditUserPage.propTypes = {
  user: object.isRequired,
  edit: func.isRequired,
  success: bool
};

const mapStateToProps = state => ({
  user: state.getIn(['session', 'user']).toJS(),
  success: state.getIn(['editSucess', 'success'])
});

const mapDispatch = dispatch => ({
  edit: user => dispatch(editUser(user.toJS())),
});

export default connect(mapStateToProps, mapDispatch)(EditUserPage);
