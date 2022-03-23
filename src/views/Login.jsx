import React, { useState, useReducer, useEffect } from 'react';
import { navigate } from "@reach/router";

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from '@material-ui/core/Typography';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import './LoginSignup.css';

import { userExists, verifyPassword } from '../server';


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

function Login(props) {
  const [username, setUsername]          = useState('');
  const [password, setPassword]          = useState('');
  const [uError, setUError]              = useState('');
  const [pError, setPError]              = useState('');
  const [hidePassword, swapHidePassword] = useReducer((s, _) => !s, true);
  const [loginHover, swapLoginHover]     = useReducer(hoverReducer, false);
  const [signupHover, swapSignupHover]   = useReducer(hoverReducer, false);


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
              <IconButton onClick={swapHidePassword}>
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
        onMouseEnter={() => swapLoginHover('enter')}
        onMouseLeave={() => swapLoginHover('leave')}>
        Login
      </Button>

      <br /><br />

      <Button
        className='button'
        variant={signupHover ? 'outlined' : 'text'}
        color='primary'
        onClick={ () => navigate('/signup') }
        onMouseEnter={() => swapSignupHover('enter')}
        onMouseLeave={() => swapSignupHover('leave')}>
        Sign Up
      </Button>

    </div>
  );
}


export default Login;
