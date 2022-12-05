import ax from '../axios';
import type { UserLoginPayload, UserRegisterPayload } from '../types';

const axios = ax.create({
  baseURL: 'users/',
});

export const handleUserLogin = async (payload : UserLoginPayload) => {
  const res = await axios.post('/login', payload);

  return res.data;
};

export const handleUserRegister = async (payload : UserRegisterPayload) => {
  const res = await axios.post('/register', payload);

  return res.data;
};

export const handleUserLogout = async () => {
  const res = await axios.post('/logout');

  return res.data;
};

export const handleUserAuth = async () => {
  const res = await axios.get('/auth');

  return res.data;
};
