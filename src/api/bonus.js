import axios from 'axios';

export const getUserList = () => {
  axios
    .get('/user')
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const setUserBonus = (data) => {
  axios
    .post('/bonus', data)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};
