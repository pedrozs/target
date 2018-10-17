import React from 'react';
import ActionCable from 'actioncable';
import { connect } from 'react-redux';
import { array, number } from 'prop-types';
// import _ from 'lodash';
// import queryString from 'query-string';
import { sessionService } from 'redux-react-session';

// export const applyQueryParams = (url, params) => {
//   let urlWithQuery = url;
//   const validParams = params.filter(param => Boolean(param.value));
//   if (!_.isEmpty(validParams)) {
//     const first = validParams.shift();
//     urlWithQuery = `${urlWithQuery}?${first.prop}=${first.value}`;
//     validParams.forEach(({ prop, value }) => {
//       const query = {};
//       query[prop] = value;
//       urlWithQuery = `${urlWithQuery}&${queryString.stringify(query)}`;
//     });
//   }
//   return urlWithQuery;
// };

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.roomChannel = React.createRef();
    this.newMessage = React.createRef();
    this.state = {
      messages: [],
    };
    this.room = null;
  }

  componentDidMount() {
    const { conversations, activeConversation } = this.props;
    sessionService.loadSession().then(({ token, client, uid }) => {
      const props = [
        { prop: 'access-token', value: token },
        { prop: 'client', value: client },
        { prop: 'uid', value: uid }
      ];
      this.cable = ActionCable.createConsumer(process.env.API_WS_URL);
      this.room = this.cable.subscriptions.create(
        {
          origin: 'target-app',
          chatChannel: 'ChatChannel',
          chatChannelAction: 'send_message',
          roomIdentifier: 'match_conversation_id',
          headers: {
            HTTP_AUTHORIZATION: 'pedro@rootstrap.com'
          }
        },
        {
          origin: 'target-app',
          headers: { origin: 'target' },
          received: (newLine) => {
            console.log(newLine);
          }
        }
      );
      console.log(this.room);
    });
  }

  sendMessage = () => {
    const { conversations, activeConversation } = this.props;
    this.room.send({
      action: 'send_message',
      content: 'text',
      match_conversation_id: conversations[activeConversation].matchId,
      body: 'yayy'
    })
  }

  render() {
    return (
      <div onClick={this.sendMessage} >
        Hello
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
