import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';

import myServer from './server';
import Login    from './views/Login';
import Home     from './views/Home';
import Signup   from './views/Signup';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: localStorage.getItem('username'),
      token: localStorage.getItem('token'),
    };

    this.logIn          = this.logIn.bind(this);
    this.signOut        = this.signOut.bind(this);
    this.isValidSession = this.isValidSession.bind(this);
  }

  async componentDidMount() {
    if (this.isValidSession()) {

    }
  }

  async logIn(username) {
    const token = await myServer.generateToken(username);
    this.setState({
      username: username,
      token: token,
    });
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
  }

  signOut() {
    myServer.destroyToken(this.state.username);
    this.setState({
      username: '',
      token: '',
    });
    localStorage.removeItem('username');
    localStorage.removeItem('token');
  }

  async isValidSession() {
    return await myServer.verifyToken(this.state.username, this.state.token);
  }

  render() {
    return (
      <BrowserRouter>
        <div className='App'>
          <Switch>
            <Route path='/login'>
              <Login
                server={ myServer }
                logIn={ (u) => this.logIn(u) }
                isValid={this.isValidSession} />
            </Route>
            <Route path='/signup'>
              <Signup
                server={ myServer }
                logIn={ (u) => this.logIn(u) }
                isValid={this.isValidSession} />
            </Route>
            <Route exact path='/'>
              <Home
                server={ myServer }
                username={this.state.username}
                signOut={ () => this.signOut() }
                isValid={this.isValidSession}/>
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
