import api from './apiService';

class Conversations {
  static getConversations() {
    return api.get('match_conversations');
  }
  static getMessages(id) {
    return api.get(`match_conversations/${id}/messages`);
  }
}

export default Conversations;
