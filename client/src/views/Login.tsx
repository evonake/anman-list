import React from 'react';
import { Card, CardContent, Divider } from '@mui/material';

import LoginLabel from '../components/LoginLabel';
import LoginForm from '../components/LoginForm';

import '../styles/views/login.css';

type Props = {
  setView: React.Dispatch<React.SetStateAction<string>>;
};
function Login({ setView }: Props) {
  return (
    <div id="login-container">
      <Card variant="outlined">
        <CardContent>
          <LoginLabel className="split left" />
          <Divider flexItem variant="middle" orientation="vertical" />
          <LoginForm className="split right" setView={setView} />
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
