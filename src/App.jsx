import React, {useState} from 'react';
import { Router } from "@reach/router";

import './App.css';

import {generateToken, verifyToken, destroyToken} from './server';
import Login    from './views/Login.jsx';
import Home     from './views/Home.jsx';
import Signup   from './views/Signup.jsx';


function App(props) {
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [token, setToken]       = useState(localStorage.getItem('token'));

  const logIn = async (u) => {
    const t = await generateToken(u);
    setUsername(u);
    setToken(t);
    localStorage.setItem('username', u);
    localStorage.setItem('token', t);
  }
  const signOut = () => {
    destroyToken(username);
    setUsername(undefined);
    setToken(undefined);
    localStorage.removeItem('username');
    localStorage.removeItem('token');
  }
  const isValidSession = async () => {
    return await verifyToken(username, token);
  }

  return (
    <Router>
      <Home
        path='/home'
        username={username}
        token={token}
        signOut={ () => signOut() }
        isValid={ () => isValidSession() }/>
      <Login
        default
        path='/login'
        logIn={ (u) => logIn(u) }
        isValid={ () => isValidSession() } />
      <Signup
        path='/signup'
        logIn={ (u) => logIn(u) }
        isValid={ () => isValidSession() } />
    </Router>
  );
}

export default App;
