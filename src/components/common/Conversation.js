import React from 'react';
import { object } from 'prop-types';
import { Link } from 'react-router-dom';

import routes from '../../constants/routesPaths';
import profilePic from '../../img/guy.svg';

const Conversation = ({ conversation }) => (
  <Link className="row conversation" to={`${routes.chat}/${conversation.matchId}`} >
    {console.log(conversation.matchId)}
    {conversation.unreadMessages != 0 &&
      <div className="unread-messages">{conversation.unreadMessages}</div>
    }
    <div className="conversation-profile-pic"><img src={profilePic} alt="Avatar" /></div>
    <div className="conversation-description">
      <div className="user-full-name">{conversation.user.fullName}</div>
      <div className="last-message">{conversation.lastMessage}</div>
    </div>
    <div className="topic">{conversation.topicIcon}</div>
  </Link>
);

Conversation.propTypes = {
  conversation: object
};

export default Conversation;
