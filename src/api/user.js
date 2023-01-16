import axios from 'axios';

export const login = (data) => {
  axios
    .post('/user/login', data)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};
