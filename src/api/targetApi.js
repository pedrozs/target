import api from './apiService';

class Target {
  static createTarget(target) {
    return api.post('targets', { target });
  }
  static getTargets() {
    return api.get('targets');
  }
  static deleteTarget(id) {
    return api.delete(`targets/${id}`);
  }
}

export default Target;
