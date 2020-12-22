import React from 'react';

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
    return (
      <div className='Home'>
        <Button variant='outlined' color='primary' onClick={this.signOut}>Sign Out</Button>
      </div>
    );
  }
}

export default Home;
