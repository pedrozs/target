import React from 'react';
import { func, string, array } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Conversation from './Conversation';
import { logout } from '../../actions/sessionActions';
import smilies from '../../img/smilies.svg';
import profilePic from '../../img/guy.svg';
import blueCircle from '../../img/blue-circle.svg';
import routes from '../../constants/routesPaths';

const renderConversations = (conversations) => {
  if (conversations.length) {
    return conversations.map((conversation, index) => <Conversation key={index} conversation={conversation} />);
  }
  return (
    <p className="target-slogan center">
      NO matches yet!
    </p>);
};

const Menu = ({ logout, username, conversations, targets }) => (
  <div className="left-panel">
    <div className="column">
      <p className="target-title"><FormattedMessage id="home.title" /></p>
      <div className="top-pic" >
        <img src={blueCircle} alt="blue" />
        <img src={profilePic} alt="guy" />
      </div>
      <p>{ username }</p>
      <p className="edit-logout">
        <Link to={routes.editUser} className="edit" ><FormattedMessage id="home.edit" /></Link>
        &nbsp;/&nbsp;
        <a className="logout" onClick={logout}><FormattedMessage id="home.logout" /></a>
      </p>
      <div className="separator" />
      { (!targets.length) ?
        <p className="target-slogan center">
          <FormattedMessage id="home.firstTarget" />
        </p> : renderConversations(conversations)
      }
    </div>
    <img className="bottom-smilies" src={smilies} alt="smilies" />
  </div>
);

const mapState = state => ({
  username: state.getIn(['session', 'user', 'username']),
  conversations: state.getIn(['conversations']).toJS(),
  targets: state.getIn(['target']).toJS(),
});

const mapDispatch = dispatch => ({
  logout: () => dispatch(logout())
});

Menu.propTypes = {
  logout: func.isRequired,
  username: string,
  conversations: array,
  targets: array
};

export default connect(mapState, mapDispatch)(Menu);
