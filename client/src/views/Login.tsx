import React from 'react';
import { Card, CardContent, Divider } from '@mui/material';

import LoginLabel from '../components/LoginLabel';
import LoginForm from '../components/LoginForm';

import '../styles/views/login.css';

type Props = {
  setView: (view: string) => void;
};
function Login({ setView }: Props) {
  return (
    <div id="login-container">
      <Card id="login-card" variant="outlined">
        <CardContent id="login-card-content">
          <LoginLabel className="split left" />
          <Divider flexItem variant="middle" orientation="vertical" />
          <LoginForm className="split right" toRegister={() => setView('register')} />
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
