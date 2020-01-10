import axios from 'axios';

const apiKey = 'AIzaSyAzWGnKUYY8e6g9oASL90g7tj4TjoVCRGg';

export const todoInstence = axios.create({
  baseURL: 'https://react-my-test-fb5ea.firebaseio.com/'
});

export const signupInstance = async data => {
  const response = await axios.post(
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + apiKey,
    data
  );
  return response;
};

export const signinInstance = async data => {
  const response = await axios.post(
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
      apiKey,
    data
  );
  return response;
};
