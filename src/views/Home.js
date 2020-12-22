import React from 'react';
import { Redirect } from 'react-router-dom';

import './Home.css';

import Button from '@material-ui/core/Button';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  signOut() {
    localStorage.removeItem('username');
    window.location.href = '/';
  }

  render() {
    if (!this.props.username) {
      return <Redirect to=''/>;
    }

    return (
      <div className='Home'>
        <Button variant='outlined' color='primary' onClick={this.signOut}>Sign Out</Button>
      </div>
    );
  }
}

export default Home;
