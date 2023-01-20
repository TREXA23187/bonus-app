import axios from 'axios';

// const BASE_URL = '47.243.60.114';
const BASE_URL = 'localhost';
// const BASE_URL = 'shaoshanbonus.trexchen.com';

const instance = axios.create({
  baseURL: `http://${BASE_URL}:3000`,
  timeout: 5000,
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  (response) => {
    const msg = response.data.msg;
    // if (msg == 'NOTLOGIN') {
    //   window.location.replace('/home');
    //   return;
    // }
    return response.data;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export function get(url, params) {
  return instance.get(url, {
    params,
  });
}

export function post(url, data) {
  return instance.post(url, data);
}

export function put(url, data) {
  return instance.put(url, data);
}

export function del(url) {
  return instance.delete(url);
}
