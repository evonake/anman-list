import {
  USER_LOGIN,
  USER_REGISTER,
  USER_LOGOUT,
  USER_SET,
} from '../actionNames/userEvents';

export const userLogin = (username: string, password: string) => ({
  type: USER_LOGIN,
  payload: {
    username,
    password,
  },
});

export const userRegister = (username: string, password: string) => ({
  type: USER_REGISTER,
  payload: {
    username,
    password,
  },
});

export const userLogout = () => ({
  type: USER_LOGOUT,
});

export const userSet = (username: string) => ({
  type: USER_SET,
  payload: {
    username,
  },
});
