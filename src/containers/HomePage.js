import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { func } from 'prop-types';

import Menu from '../components/common/Menu';
import { logout } from '../actions/sessionActions';

const HomePage = ({ logout }) => (
  <div className="home-page">
    <Menu />
    <button onClick={logout}>
      <FormattedMessage id="logout.button" />
    </button>
  </div>
);

HomePage.propTypes = {
  logout: func,
};

const mapDispatch = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(null, mapDispatch)(HomePage);
