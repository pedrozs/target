import React from 'react';
import { bool, func } from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { signUp } from '../actions/userActions';
import AppPromo from '../components/common/AppPromo';
import routes from '../constants/routesPaths';
import SignUpForm from '../components/user/SignUpForm';

const SignUpPage = ({ signUp, authenticated }) => {
  if (authenticated) {
    return <Redirect to={routes.index} />;
  }

  return (
    <div className="signUpPage">
      <SignUpForm onSubmit={signUp} />
      <AppPromo />
    </div>
  );
};

SignUpPage.propTypes = {
  signUp: func.isRequired,
  authenticated: bool.isRequired
};

const mapState = state => ({
  authenticated: state.getIn(['session', 'authenticated'])
});

const mapDispatch = dispatch => ({
  signUp: user => dispatch(signUp(user.toJS()))
});

export default connect(mapState, mapDispatch)(SignUpPage);
