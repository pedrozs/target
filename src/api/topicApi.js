import api from './apiService';

class Topic {
  static getTopics() {
    return api.get('topics');
  }
}

export default Topic;
