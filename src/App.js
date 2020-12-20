import React from 'react';
import './App.css';

import Login from './views/Login';
import Home  from './views/Home';

import myServer from './server';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      view: 'login',
    };
  }

  render() {
    const views = {
      login: <Login
                server={ myServer }
                goHome={ () => this.setState({ view: 'home' }) }/>,

      home:  <Home
                server={ myServer }
                goLogin={ () => this.setState({ view: 'login' }) } />
    }
    return (
      <div className='App'>
        {views[this.state.view]}
      </div>
    )
  }
}

export default App;
