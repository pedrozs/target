import React from 'react';
import { connect } from 'react-redux';


class Chat extends React.Component {
  constructor({ topic, messages, user}) {
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



  render() {
    return (
      <div></div>
    );
  }

}

const mapDispatch = (dispatch) => ({
  getMessages: dispatch(getMessages())
})

export default connect(mapDispatch)(Chat);
