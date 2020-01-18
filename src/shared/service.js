import axios from 'axios';

const apiKey = 'AIzaSyAzWGnKUYY8e6g9oASL90g7tj4TjoVCRGg';

export const ajaxBaseUrl = axios.create({
  baseURL: 'https://react-my-test-fb5ea.firebaseio.com/'
});

export const ajaxSignUp = async data => {
  const response = await axios.post(
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + apiKey,
    data
  );
  return response;
};

export const ajaxSignIn = async data => {
  const response = await axios.post(
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
      apiKey,
    data
  );
  return response;
};

export const ajaxGetTodoList = async () => {
  const response = await ajaxBaseUrl.get(
    `/todo/${localStorage.getItem('userId')}.json`
  );
  return response;
};

export const ajaxAddTodoItem = async data => {
  const response = await ajaxBaseUrl.post(
    `/todo/${localStorage.getItem('userId')}.json`,
    data
  );
  return response;
};

export const ajaxUpdateTodoItemDone = async (id, data) => {
  const response = await ajaxBaseUrl.put(
    `/todo/${localStorage.getItem('userId')}/${id}.json`,
    data
  );
  return response;
};

export const ajaxDeleteTodoItem = async id => {
  const response = await ajaxBaseUrl.delete(
    `/todo/${localStorage.getItem('userId')}/${id}.json`
  );
  return response;
};
