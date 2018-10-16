import React from 'react';
import { object } from 'prop-types';

import profilePic from '../../img/guy.svg';

const Conversation = ({
  conversation: { unreadMessages, user, lastMessage, topicIcon }
}) => (
  <div className="row conversation">
    {unreadMessages != 0 &&
      <div className="unread-messages">{unreadMessages}</div>
    }
    <div className="conversation-profile-pic"><img src={profilePic} alt="Avatar" /></div>
    <div className="conversation-description">
      <div className="user-full-name">{user.fullName}</div>
      <div className="last-message">{lastMessage}</div>
    </div>
    <div className="topic">{topicIcon}</div>
  </div>
);

Conversation.propTypes = {
  conversation: object.isRequired
};

export default Conversation;
