import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import './App.css';

import myServer from './server';
import Login    from './views/Login';
import Home     from './views/Home';
import Signup   from './views/Signup';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
    };

    if (!this.state.username && localStorage.getItem('username')) {
      this.state = { username: localStorage.getItem('username') };
    }

    this.logIn = this.logIn.bind(this);
  }

  logIn(username) {
    this.setState({ username: username });
    localStorage.setItem('username', username);
  }

  render() {
    return (
      <BrowserRouter>
        <div className='App'>
          <Switch>
            <Route exact path='/'>
              <Login server={ myServer } logIn={ (u) => this.logIn(u) }/>
            </Route>
            <Route path='/signup'>
              <Signup server={ myServer } logIn={ (u) => this.logIn(u) }/>
            </Route>
            <Route path="/home">
              <Home server={ myServer } username={this.state.username} />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
