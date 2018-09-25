import React from 'react';
import { bool, func } from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { login, loginFacebook } from '../actions/sessionActions';
import AppPromo from '../components/common/AppPromo';
import LoginForm from '../components/user/LoginForm';
import routes from '../constants/routesPaths';

const LoginPage = ({ loginFacebook, login, authenticated }) => {
  if (authenticated) {
    return <Redirect to={routes.index} />;
  }

  return (
    <div className="login-page">
      <LoginForm onSubmit={login} onFbLogin={loginFacebook} />
      <AppPromo />
    </div>
  );
};

LoginPage.propTypes = {
  login: func.isRequired,
  authenticated: bool.isRequired,
  loginFacebook: func,
};

const mapState = state => ({
  authenticated: state.getIn(['session', 'authenticated'])
});

const mapDispatch = dispatch => ({
  login: user => dispatch(login(user.toJS())),
  loginFacebook: user => dispatch(loginFacebook(user.accessToken))
});

export default connect(mapState, mapDispatch)(LoginPage);
