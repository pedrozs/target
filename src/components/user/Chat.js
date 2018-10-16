import React from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { connect } from 'react-redux';
import { array, number } from 'prop-types';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.roomChannel = React.createRef();
    this.newMessage = React.createRef();
    this.state = {
      messages: [],
    };
  }

  onReceived(message) {
    console.log(message);
    this.setState({
      messages: [
        ...this.state.messages,
        message
      ]
    });
  }

  sendMessage = () => {
    const { conversations, activeConversation } = this.props;
    const message = {
      action: 'send_message',
      content: 'text',
      match_conversation_id: conversations[activeConversation]
    };
    this.roomChannel.current.perform('sendMessage', { message });
  }

  render() {
    const { conversations, activeConversation } = this.props;
    return (
      <div>
        <ActionCable ref={this.roomChannel} channel={{ channel: 'ChatChannel', room: conversations[activeConversation].matchId }} onReceived={this.onReceived} />
        <ul>
          {this.state.messages.map(message =>
            <li key={message.id}>{message.body}</li>)}
        </ul>
        <input ref={this.newMessage} type="text" />
        <button onClick={this.sendMessage}>Send</button>
      </div>
    );
  }
}

Chat.propTypes = {
  conversations: array.isRequired,
  activeConversation: number.isRequired,
};

const mapState = state => ({
  conversations: state.getIn(['conversations']).toJS()
});

export default connect(mapState)(Chat);
