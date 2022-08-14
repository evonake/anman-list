import axios from 'axios';

axios.defaults.baseURL = '/api';

export async function login({ username, password }) {
  try {
    const res = await axios.post('/users/login', {
      username,
      password,
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
}

export async function register({ username, password }) {
  try {
    const res = await axios.post('/users/register', {
      username,
      password,
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
}

export function logout() {}
