import React from 'react';
import { connect } from 'react-redux';

import { getMessages } from '../../actions/conversationsActions';

class Chat extends React.Component {
  constructor({ topic, messages, user }) {
    super(props);
    this.state = {
      messages,
      user,
      topic
    }
  }

  componentDidMount() {
    setInterval(getMessages(this.props.id), 1000);
  }

  onReceived(message) {
    this.setState({
      messages: [
        ...this.state.messages,
        message
      ]
    })
  }

  sendMessage = () => {
    const message = this.refs.newMessage.value
    // Call perform or send
    this.refs.roomChannel.perform('sendMessage', { message })
  }

  render() {
    return (
      <div />
    );
  }
}

const mapDispatch = dispatch => ({
  getMessages: id => dispatch(getMessages(id))
})

export default connect(mapDispatch)(Chat);
