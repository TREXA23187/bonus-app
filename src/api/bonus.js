import { get, post } from '../utils/request';

export function getBonusList() {
  return get('/api/bonus');
}

export function setUserBonus(data) {
  return post('/api/bonus/map', data);
}

export function getUserBonusNum() {
  return get('/api/bonus/num');
}

export function setUserBonusNum(data) {
  return post('/api/bonus/num', data);
}
