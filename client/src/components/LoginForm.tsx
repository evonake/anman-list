import React, { useEffect, useState } from 'react';

import { Stack, Button } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { userLogin } from '../redux/constants/actionCreators/userActions';
import { selectUsername } from '../redux/features/userSlice';
import { selectError } from '../redux/features/errorSlice';

import MyInput from './MyInput';

import '../styles/components/loginform.css';

type Props = {
  className?: string
  setView: React.Dispatch<React.SetStateAction<string>>;
};
const defaultProps = {
  className: '',
};
type State = {
  username: string;
  usernameError: string;
  password: string;
  passwordError: string;
};
function LoginForm({ className, setView }: Props) {
  const dispatch = useAppDispatch();

  const username = useAppSelector(selectUsername);
  const error = useAppSelector(selectError);

  const [values, setValues] = useState<State>({
    username: '',
    usernameError: '',
    password: '',
    passwordError: '',
  });

  const handleInputChange = (prop: keyof State) => (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setValues({ ...values, [prop]: e.target.value });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (!values.username) {
      setValues({ ...values, usernameError: 'Username is required' });
    } else if (!values.password) {
      setValues({ ...values, passwordError: 'Password is required' });
    } else {
      dispatch(userLogin(values.username, values.password));
    }
  };

  useEffect(() => {
    setValues({ ...values, usernameError: '' });
  }, [values.username]);
  useEffect(() => {
    setValues({ ...values, passwordError: '' });
  }, [values.password]);
  useEffect(() => {
    if (username) {
      setView('home');
    }
  }, [username]);
  useEffect(() => {
    if (error.type) {
      setValues({ ...values, [`${error.type}Error`]: error.message });
    }
  }, [error]);

  return (
    <div className={className}>
      <Stack
        id="loginform-container"
        spacing={2}
      >
        <MyInput
          label="Username"
          error={values.usernameError}
          onChange={handleInputChange('username')}
        >
          {values.username}
        </MyInput>
        <MyInput
          label="Password"
          error={values.passwordError}
          onChange={handleInputChange('password')}
        >
          {values.password}
        </MyInput>

        <Button
          className="submit-button"
          type="submit"
          variant="contained"
          onClick={handleSubmit}
        >
          Log In
        </Button>
        <Button variant="text" onClick={() => setView('register')}>Register</Button>
      </Stack>
    </div>
  );
}
LoginForm.defaultProps = defaultProps;

export default LoginForm;
