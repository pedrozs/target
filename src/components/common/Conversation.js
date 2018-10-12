import React from 'react';
import { object } from 'prop-types';

import profilePic from '../../img/guy.svg';

const Conversation = ({ conversation }) => (
  // <div className="column conversation">
    <div className="row conversation">
      {conversation.unreadMessages != 0 &&
        <div className="unread-messages">{conversation.unreadMessages}</div>
      }
      <div className="conversation-profile-pic"><img src={profilePic} alt="Avatar" /></div>
      <div className="conversation-description">
        <div className="user-full-name">{conversation.user.fullName}</div>
        <div className="last-message">{conversation.lastMessage}</div>
      </div>
      <div className="topic">{conversation.topicIcon}</div>
    </div>
    /* <div className="hl" /> */
  // </div>
);

Conversation.propTypes = {
  conversation: object
};

export default Conversation;
