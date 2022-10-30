import React from 'react';

import { Stack, Button } from '@mui/material';

import { useAppDispatch } from '../redux/hooks';
import { userRegister } from '../redux/constants/actionCreators/selfActions';

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
    validate,
  } = useInputWithErrors<InputState>(initialInput, ['confirm']);

  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (validate()) {
      dispatch(userRegister(inputs.username, inputs.password));
    }
  };

  return (
    <div className={className}>
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
          onClick={handleSubmit}
        >
          Register
        </Button>
        <Button variant="text" onClick={toLogin}>Log In</Button>
      </Stack>
    </div>
  );
}
RegisterForm.defaultProps = defaultProps;

export default RegisterForm;
