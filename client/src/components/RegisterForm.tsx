import React from 'react';

import { Stack, Button } from '@mui/material';

import { useAppDispatch } from '../redux/hooks';
import { registerThunk, selectUserError } from '../redux/features/userSlice';

import useInputWithErrors from '../hooks/inputWithErrors';

import LoginInput from './LoginInput';

import '../styles/components/loginform.css';

type Props = {
  className?: string
  toLogin: () => void;
};
const defaultProps = {
  className: '',
};
type InputState = {
  username: string;
  password: string;
  confirm: string;
};
const initialInput: InputState = {
  username: '',
  password: '',
  confirm: '',
};
function RegisterForm({ className, toLogin }: Props) {
  const dispatch = useAppDispatch();

  const {
    inputs,
    handleInputChange,
    errors,
    setError,
    validate,
  } = useInputWithErrors<InputState>(initialInput, selectUserError);

  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    if (validate()) {
      if (inputs.password !== inputs.confirm) {
        setError('confirm', 'Passwords do not match');
      } else {
        dispatch(registerThunk(inputs));
      }
    }
  };

  return (
    <form className={className} onSubmit={handleSubmit}>
      <Stack
        id="registerform-container"
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
        <LoginInput
          label="Confirm"
          error={errors.confirm}
          onChange={handleInputChange('confirm')}
        >
          {inputs.confirm}
        </LoginInput>

        <Button
          className="submit-button"
          type="submit"
          variant="contained"
        >
          Register
        </Button>
        <Button variant="text" onClick={toLogin}>Log In</Button>
      </Stack>
    </form>
  );
}
RegisterForm.defaultProps = defaultProps;

export default RegisterForm;
