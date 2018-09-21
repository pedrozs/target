import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { object } from 'prop-types';

import { logout } from '../actions/sessionActions';

const HomePage = ({ logout }) => (
  <div>
    <p><FormattedMessage id="home.welcome" /></p>
    <button onClick={logout}>
      <FormattedMessage id="logout.button" />
    </button>
  </div>
);

HomePage.propTypes = {
  logout: object,
};

const mapDispatch = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(null, mapDispatch)(HomePage);
