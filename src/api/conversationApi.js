import api from './apiService';

class Conversations {
  static getConversations() {
    return api.get('match_conversations');
  }
}

export default Conversations;
