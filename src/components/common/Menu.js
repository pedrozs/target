import React from 'react';
import { func, string } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import { logout } from '../../actions/sessionActions';
import smilies from '../../img/smilies.svg';
import profilePic from '../../img/guy.svg';
import blueCircle from '../../img/blue-circle.svg';

const Menu = ({ logout, user }) => (
  <div className="menu">
    <p className="target-title">TARGET</p>
    <div className="profile-pic" >
      <img src={blueCircle} alt="blue" />
      <img src={profilePic} alt="guy" />
    </div>
    <p> { user } </p>
    <p className="edit-logout">
      <a className="edit" > <FormattedMessage id="home.edit" /> </a>
      /
      <a className="logout" onClick={logout}> <FormattedMessage id="home.logout" /> </a>
    </p>
    <p>
      <FormattedMessage id="home.firstTarget" />
    </p>
    <div className="spacer" />
    <img className="bottom-smilies" src={smilies} alt="smilies" />
  </div>
);

const mapDispatch = dispatch => ({
  logout: () => dispatch(logout())
});

Menu.propTypes = {
  logout: func.isRequired,
  user: string.isRequired,
};

export default connect(null, mapDispatch)(Menu);
