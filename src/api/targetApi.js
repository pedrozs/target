import api from './apiService';

class Target {
  static createTarget(target) {
    console.log(target);
    return api.post('targets', { target });
  }
  static getTargets() {
    return api.get('targets');
  }
}

export default Target;
