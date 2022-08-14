import React, {
  useState,
  useReducer,
  useEffect,
  useRef,
} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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

import { login as loginStore } from '../features/userSlice';
import { login as loginAPI } from '../api/user';

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

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userRef = useRef();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [uError, setUError] = useState('');
  const [pError, setPError] = useState('');
  const [hidePassword, toggleHidePassword] = useReducer((s, _) => !s, true);
  const [loginHover, toggleLoginHover] = useReducer(hoverReducer, false);
  const [signupHover, toggleSignupHover] = useReducer(hoverReducer, false);

  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    setUError('');
  }, [username]);
  useEffect(() => {
    setPError('');
  }, [password]);

  const handleLoginClick = async () => {
    const res = await loginAPI({ username, password });
    if (res.success) {
      dispatch(loginStore(username));
      setUsername('');
      setPassword('');
      navigate('/');
    } else if (res.errorType === 'username') {
      setUsername('');
      setPassword('');
      setUError(res.errorMessage);
    } else if (res.errorType === 'password') {
      setPassword('');
      setPError(res.errorMessage);
    }
  };

  return (
    <section className="LoginSignup">
      <Typography variant="h5">
        LOGIN
      </Typography>

      <br />

      <FormControl error={Boolean(uError)}>
        <InputLabel>Username</InputLabel>
        <Input
          ref={userRef}
          className="input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <FormHelperText color="secondary">{uError || ' '}</FormHelperText>
      </FormControl>

      <br />
      <br />

      <FormControl error={Boolean(pError)}>
        <InputLabel>Password</InputLabel>
        <Input
          className="input"
          error={Boolean(pError)}
          type={hidePassword ? 'password' : 'text'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          endAdornment={(
            <InputAdornment position="end">
              <IconButton onClick={toggleHidePassword}>
                {hidePassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )}
        />
        <FormHelperText color="secondary">{pError || ' '}</FormHelperText>
      </FormControl>

      <br />
      <br />

      <Button
        type="submit"
        className="button"
        variant={loginHover ? 'contained' : 'outlined'}
        color="primary"
        onClick={handleLoginClick}
        onMouseEnter={() => toggleLoginHover('enter')}
        onMouseLeave={() => toggleLoginHover('leave')}
      >
        Login
      </Button>

      <br />
      <br />

      <Button
        className="button"
        variant={signupHover ? 'outlined' : 'text'}
        color="primary"
        onClick={() => navigate('/signup')}
        onMouseEnter={() => toggleSignupHover('enter')}
        onMouseLeave={() => toggleSignupHover('leave')}
      >
        Sign Up
      </Button>

    </section>
  );
}

export default Login;
