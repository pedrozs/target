import React from 'react';
import { func, string } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logout } from '../../actions/sessionActions';
import smilies from '../../img/smilies.svg';
import profilePic from '../../img/guy.svg';
import blueCircle from '../../img/blue-circle.svg';
import routes from '../../constants/routesPaths';

const Menu = ({ logout, username }) => (
  <div className="side-menu menu">
    <p className="target-title"><FormattedMessage id="home.title" /></p>
    <div className="profile-pic" >
      <img src={blueCircle} alt="blue" />
      <img src={profilePic} alt="guy" />
    </div>
    <p>{ username }</p>
    <p className="edit-logout">
      <Link to={routes.editUser} className="edit" ><FormattedMessage id="home.edit" /></Link>
      /
      <a className="logout" onClick={logout}><FormattedMessage id="home.logout" /></a>
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
  username: string,
};

export default connect(null, mapDispatch)(Menu);
