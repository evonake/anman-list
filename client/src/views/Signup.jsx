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
import { login as loginAPI, register as registerAPI } from '../api/user';

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

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userRef = useRef();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [uError, setUError] = useState('');
  const [pError, setPError] = useState('');
  const [cError, setCError] = useState('');
  const [hidePassword, toggleHidePassword] = useReducer((s, _) => !s, true);
  const [hideConfirm, toggleHideConfirm] = useReducer((s, _) => !s, true);
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
  useEffect(() => {
    setCError('');
  }, [confirm]);

  const handleSignupClick = async () => {
    const registerRes = await registerAPI({ username, password });
    if (registerRes.success) {
      await loginAPI({ username, password });
      dispatch(loginStore(username));
      setUsername('');
      setPassword('');
      setConfirm('');
      navigate('/');
    } else if (registerRes.errorType === 'username') {
      setUsername('');
      setPassword('');
      setConfirm('');
      setUError(registerRes.errorMessage);
    } else if (registerRes.errorType === 'password') {
      setPassword('');
      setConfirm('');
      setPError(registerRes.errorMessage);
    } else if (registerRes.errorType === 'confirm') {
      setConfirm('');
      setCError(registerRes.errorMessage);
    }
  };

  return (
    <div className="LoginSignup">
      <Typography variant="h5">
        SIGN UP
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

      <FormControl error={Boolean(cError)}>
        <InputLabel>Confirm Password</InputLabel>
        <Input
          className="input"
          error={Boolean(cError)}
          type={hideConfirm ? 'password' : 'text'}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          endAdornment={(
            <InputAdornment position="end">
              <IconButton onClick={toggleHideConfirm}>
                {hideConfirm ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )}
        />
        <FormHelperText color="secondary">{cError || ' '}</FormHelperText>
      </FormControl>

      <br />
      <br />

      <Button
        type="submit"
        className="button"
        variant={signupHover ? 'contained' : 'outlined'}
        color="primary"
        onClick={handleSignupClick}
        onMouseEnter={() => toggleSignupHover('enter')}
        onMouseLeave={() => toggleSignupHover('leave')}
      >
        Sign up
      </Button>

      <br />
      <br />

      <Button
        className="button"
        variant={loginHover ? 'outlined' : ''}
        color="primary"
        onClick={() => navigate('/login')}
        onMouseEnter={() => toggleLoginHover('enter')}
        onMouseLeave={() => toggleLoginHover('leave')}
      >
        Login
      </Button>
    </div>
  );
}

export default Signup;
