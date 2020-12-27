import React from 'react';
import { Redirect } from 'react-router-dom';

import './Home.css';

import Tab    from '@material-ui/core/Tab';
import Tabs   from '@material-ui/core/Tabs';
import Paper  from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import ItemList from '../components/ItemList';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tab: 'anime',
    };

    if (!this.props.username || !this.props.token) {
      this.state = { leavePage: 'login' };
    }

    this.refresh            = this.refresh.bind(this);
    this.handleTab          = this.handleTab.bind(this);
    this.handleSignOutClick = this.handleSignOutClick.bind(this);
  }

  async componentDidMount() {
    await this.refresh();
  }

  async refresh() {
    if (!await this.props.isValid()) {
      this.setState({ leavePage: 'login' });
    }
    this.setState({
      userData: await this.props.server.getUserData(this.props.username, this.state.tab, 'ongoing')
    });
  }

  async shouldComponentUpdate(nextProps, nextState) {
    if (!await nextProps.isValid()) {
      this.setState({ leavePage: 'login' });
    }
    return  true;
  }

  async handleTab(e, newValue) {
    this.setState({ tab: newValue });
    await this.refresh()
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
        <Paper>
          <Tabs
            value={this.state.tab}
            onChange={this.handleTab}
            centered>
            <Tab value='anime' label='anime' />
            <Tab value='manga' label='manga' />
          </Tabs>
        </Paper>

        <br/><br/>

        <Button
          className='signout'
          variant='outlined'
          color='primary'
          onClick={this.handleSignOutClick}>
            Sign Out
        </Button>
        <br/><br/>
        <ItemList
          username={this.props.username}
          mediaType={this.state.tab}
          type='ongoing'
          server={this.props.server}
          data={this.state.userData}
          refresh={this.refresh}/>
      </div>
    );
  }
}

export default Home;
