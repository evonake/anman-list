import React, { useState, useReducer, useEffect } from 'react';
import { navigate } from "@reach/router";
import './LoginSignup.css';

import {
  Button,
  IconButton,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
  FormHelperText,
  Typography,
} from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { userExists, verifyPassword } from '../server';


function hoverReducer(_, action) {
  switch (action) {
    case 'enter':
      return true;
    case 'leave':
      return false;
    default:
      return false;
  }
}

function Login(props) {
  const [username, setUsername]          = useState('');
  const [password, setPassword]          = useState('');
  const [uError, setUError]              = useState('');
  const [pError, setPError]              = useState('');
  const [hidePassword, toggleHidePassword] = useReducer((s, _) => !s, true);
  const [loginHover, toggleLoginHover]     = useReducer(hoverReducer, false);
  const [signupHover, toggleSignupHover]   = useReducer(hoverReducer, false);


  const handleText = (type, value) => {
    if (type === 'username') {
      setUsername(value);
      setUError('');
    } else if (type === 'password') {
      setPassword(value);
      setPError('');
    }
  }
  const handleInputClick = (type) => {
    if (type === 'username') {
      setUError('');
    } else if (type === 'password') {
      setPError('');
    }
  }
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleLoginClick();
    }
  }
  const handleLoginClick = async () => {
    if (username === '') {
      setUError('Invalid username.');
      return;
    } else if (!(await userExists(username))) {
      setUError('Username does not exist.');
      return;
    }

    if (password === '') {
      setPError('Invalid password.');
      return;
    } else if (!(await verifyPassword(username, password))) {
      setPError('Incorrect password.');
      return;
    }

    await props.logIn(username);
  }

  useEffect(() => {
    const a = async () => {
      if (await props.isValid()) {
        navigate('/home');
      }
    }
    a();
  });

  return (
    <div className='LoginSignup' onKeyPress={handleKeyPress}>
      <Typography variant='h5'>
        LOGIN
      </Typography>

      <br />

      <FormControl error={Boolean(uError)}>
        <InputLabel>Username</InputLabel>
        <Input
          className='input'
          value={username}
          onClick={() => handleInputClick('username')}
          onChange={e => handleText('username', e.target.value)} />
        <FormHelperText color='secondary'>{uError || ' '}</FormHelperText>
      </FormControl>

      <br /><br />

      <FormControl error={Boolean(pError)}>
        <InputLabel>Password</InputLabel>
        <Input
          className='input'
          error={Boolean(pError)}
          type={hidePassword ? 'password' : 'text'}
          value={password}
          onClick={() => handleInputClick('password')}
          onChange={e => handleText('password', e.target.value)}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton onClick={toggleHidePassword}>
                {hidePassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>} />
        <FormHelperText color='secondary'>{pError || ' '}</FormHelperText>
      </FormControl>

      <br /><br />

      <Button
        className='button'
        variant={loginHover ? 'contained' : 'outlined'}
        color='primary'
        onClick={handleLoginClick}
        onMouseEnter={() => toggleLoginHover('enter')}
        onMouseLeave={() => toggleLoginHover('leave')}>
        Login
      </Button>

      <br /><br />

      <Button
        className='button'
        variant={signupHover ? 'outlined' : 'text'}
        color='primary'
        onClick={ () => navigate('/signup') }
        onMouseEnter={() => toggleSignupHover('enter')}
        onMouseLeave={() => toggleSignupHover('leave')}>
        Sign Up
      </Button>

    </div>
  );
}


export default Login;
