import React, { useState, useEffect, useReducer } from 'react';
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

import { userExists, newUser } from '../server';


function hoverReducer(state, action) {
  switch (action) {
    case 'enter':
      return true;
    case 'leave':
      return false;
    default:
      return false;
  }
}

function Signup(props) {
  const [username, setUsername]          = useState('');
  const [password, setPassword]          = useState('');
  const [confirm, setConfirm]            = useState('');
  const [uError, setUError]              = useState('');
  const [pError, setPError]              = useState('');
  const [cError, setCError]              = useState('');
  const [hidePassword, swapHidePassword] = useReducer((s, _) => !s, true);
  const [hideConfirm, swapHideConfirm]   = useReducer((s, _) => !s, true);
  const [loginHover, swapLoginHover]     = useReducer(hoverReducer, false);
  const [signupHover, swapSignupHover]   = useReducer(hoverReducer, false);

  const handleText = (type, value) => {
    if (type === 'username') {
      setUsername(value);
      setUError('');
    } else if (type === 'password') {
      setPassword(value);
      setPError('');
    } else if (type === 'confirm') {
      setConfirm(value);
      setCError('');
    }
  }
  const handleInputClick = (type) => {
    if (type === 'username') {
      setUError('');
    } else if (type === 'password') {
      setPError('');
    } else if (type === 'confirm') {
      setCError('');
    }
  }
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleSignupClick();
    }
  }
  const handleSignupClick = async () => {
    if (username === '') {
      setUError('Invalid username.');
      return;
    } else if (await userExists(username)) {
      setUError('Username already taken.');
      return;
    }

    if (password === '') {
      setPError('Invalid password.');
      return;
    } else if (password !== confirm) {
      setPError('Passwords don\'t match.');
      return;
    }

    newUser(username, password);
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
        SIGN UP
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
              <IconButton onClick={swapHidePassword}>
                {hidePassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>} />
        <FormHelperText color='secondary'>{pError || ' '}</FormHelperText>
      </FormControl>

      <br /><br />

      <FormControl error={Boolean(cError)}>
        <InputLabel>Confirm Password</InputLabel>
        <Input
          className='input'
          error={Boolean(cError)}
          type={hideConfirm ? 'password' : 'text'}
          value={confirm}
          onClick={() => handleInputClick('confirm')}
          onChange={e => handleText('confirm', e.target.value)}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton onClick={swapHideConfirm}>
                {hideConfirm ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>} />
        <FormHelperText color='secondary'>{cError || ' '}</FormHelperText>
      </FormControl>

      <br /><br />

      <Button
        className='button'
        variant={signupHover ? 'contained' : 'outlined'}
        color='primary'
        onClick={handleSignupClick}
        onMouseEnter={() => swapSignupHover('enter')}
        onMouseLeave={() => swapSignupHover('leave')}>
        Sign up
      </Button>

      <br /><br />

      <Button
        className='button'
        variant={loginHover ? 'outlined' : ''}
        color='primary'
        onClick={ () => navigate('/login') }
        onMouseEnter={() => swapLoginHover('enter')}
        onMouseLeave={() => swapLoginHover('leave')}>
        Login
      </Button>
    </div>
  )
}

export default Signup;
