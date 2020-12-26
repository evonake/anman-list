import React from 'react';
import { Redirect } from 'react-router-dom';

import './Home.css';

import Button from '@material-ui/core/Button';

import ItemList from '../components/ItemList';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    if (!this.props.username || !this.props.token) {
      this.state = { leavePage: 'login' };
    }

    this.handleSignOutClick = this.handleSignOutClick.bind(this);
  }

  async componentDidMount() {
    this.setState({
      userData: await this.props.server.getUserData(this.props.username)
    });
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
        <Button
          className='signout'
          variant='outlined'
          color='primary'
          onClick={this.handleSignOutClick}>
            Sign Out
        </Button>
        <br/><br/>
        <ItemList server={this.props.server} data={this.state.userData} />
      </div>
    );
  }
}

export default Home;
