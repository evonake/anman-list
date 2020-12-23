import React from 'react';
import { Redirect } from 'react-router-dom';

import './Home.css';

import Button from '@material-ui/core/Button';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleSignOutClick = this.handleSignOutClick.bind(this);
  }

  async shouldComponentUpdate(nextProps, nextState) {
    if (!await nextProps.isValid()) {
      this.setState({ leavePage: 'login' });
    }
    return true;
  }

  handleSignOutClick() {
    this.props.signOut();
    this.setState({ leavePage: 'login' });
  }

  render() {
    if (this.state.leavePage) {
      return <Redirect to={this.state.leavePage} />;
    }

    return (
      <div className='Home'>
        <Button variant='outlined' color='primary' onClick={this.handleSignOutClick}>Sign Out</Button>
      </div>
    );
  }
}

export default Home;
