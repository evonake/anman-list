import React from 'react';

import { Stack, Button } from '@mui/material';

import { useAppDispatch } from '../redux/hooks';
import { userLogin } from '../redux/constants/actionCreators/userActions';

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

  const {
    inputs,
    handleInputChange,
    errors,
    validate,
  } = useInputWithErrors<InputState>(initialInput);

  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    if (validate()) {
      dispatch(userLogin(inputs.username, inputs.password));
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

        <Button
          className="submit-button"
          type="submit"
          variant="contained"
        >
          Log In
        </Button>
        <Button variant="text" onClick={toRegister}>Register</Button>
      </Stack>
    </form>
  );
}
LoginForm.defaultProps = defaultProps;

export default LoginForm;
