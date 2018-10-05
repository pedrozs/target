import api from './apiService';

class Session {
  static login(user) {
    return api.post('/users/sign_in', user);
  }
  static loginFacebook(user) {
    return api.post('/users/facebook', user);
  }
  static logout() {
    return api.delete('/users/sign_out');
  }
  static signUp(user) {
    return api.post('/users', user);
  }
  static updateUser(user) {
    const { id } = user;
    return api.put(`users/${id}`, { user });
  }
}

export default Session;
