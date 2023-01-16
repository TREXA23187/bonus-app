import { get, post } from '../utils/request';

export function getBonusList() {
  return get('/api/bonus');
}

export function setUserBonus(data) {
  return post('/api/bonus/map', data);
}
