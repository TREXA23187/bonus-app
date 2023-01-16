import { get, post } from '../utils/request';

export function getUserList() {
  return get('/api/user');
}

export function login(data) {
  return post('/api/user/login', data);
}
