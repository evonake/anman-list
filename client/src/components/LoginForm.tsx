import React from 'react';

import { Stack, Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { loginThunk, selectUserError, selectUserReqStatus } from '../redux/features/userSlice';

import useInputWithErrors from '../hooks/inputWithErrors';

import LoginInput from './LoginInput';

import '../styles/components/loginform.css';

type Props = {
  className?: string
  toRegister: () => void;
};
const defaultProps = {
  className: '',
};
type InputState = {
  username: string;
  password: string;
};
const initialInput: InputState = {
  username: '',
  password: '',
};

function LoginForm({ className, toRegister }: Props) {
  const dispatch = useAppDispatch();

  const reqStatus = useAppSelector(selectUserReqStatus);

  const {
    inputs,
    handleInputChange,
    errors,
    validate,
  } = useInputWithErrors<InputState>(initialInput, selectUserError);

  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    if (validate()) {
      dispatch(loginThunk(inputs));
    }
  };

  return (
    <form className={className} onSubmit={handleSubmit}>
      <Stack
        id="loginform-container"
        spacing={2}
      >
        <LoginInput
          label="Username"
          error={errors.username}
          onChange={handleInputChange('username')}
        >
          {inputs.username}
        </LoginInput>
        <LoginInput
          label="Password"
          error={errors.password}
          onChange={handleInputChange('password')}
        >
          {inputs.password}
        </LoginInput>

        <LoadingButton
          className="submit-button"
          type="submit"
          loading={reqStatus === 'pending'}
          variant="contained"
        >
          Log In
        </LoadingButton>
        <Button
          variant="text"
          onClick={toRegister}
          disabled={reqStatus === 'pending'}
        >
          Register
        </Button>
      </Stack>
    </form>
  );
}
LoginForm.defaultProps = defaultProps;

export default LoginForm;
