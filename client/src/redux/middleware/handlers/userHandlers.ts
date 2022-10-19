/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';

import type Handler from './handler';

import { userSet } from '../../constants/actionCreators/userActions';
import { errorSet, errorReset } from '../../constants/actionCreators/errorActions';

export const handleUserLogin: Handler = async ({ dispatch, getState }, action) => {
  const { username, password } = action.payload;

  const res = await axios.post('/users/login', {
    username,
    password,
  });

  if (res.data.success) {
    dispatch(errorReset());
    dispatch(userSet(username));
  } else {
    const { type, message } = res.data;
    dispatch(errorSet({ type, message }));
  }
};

export const handleUserRegister: Handler = async ({ dispatch, getState }, action) => {
  const { username, password } = action.payload;

  const res = await axios.post('/register', {
    username,
    password,
  });

  if (res.data.success) {
    dispatch(errorReset());
    handleUserLogin({ dispatch, getState }, action);
  } else {
    const { type, message } = res.data;
    dispatch(errorSet({ type, message }));
  }
};

export const handleUserLogout: Handler = async ({ dispatch, getState }, action) => {
  const res = await axios.post('/users/logout');

  if (res.data.success) {
    dispatch(errorReset());
    dispatch(userSet(''));
  } else {
    const { type, message } = res.data;
    dispatch(errorSet({ type, message }));
  }
};
