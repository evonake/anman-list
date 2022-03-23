import React, { useState, useReducer, useEffect } from 'react';
import { navigate } from "@reach/router";
import './Home.css';

import {
  Tab,
  Tabs,
  Paper,
  Button,
  Snackbar,
} from '@mui/material';

import ItemList from '../components/ItemList';


function Home(props) {
  const [tab, changeTab]           = useState('anime');
  const [snackbar, toggleSnackbar] = useReducer((s, _) => !s, false);

  const handleSignOutClick = () => {
    props.signOut();
    navigate('/login');
  }
  const refresh = async () => {
    if (!await props.isValid()) {
      navigate('/login');
    }
  }
  useEffect(() => {
    const a = async () => {
      await refresh();
    }
    a();
  });

  return (
    <div className='Home'>
      <Paper>
        <Tabs
          value={tab}
          onChange={(_, v) => changeTab(v)}
          centered>
          <Tab value='anime' label='anime' />
          <Tab value='manga' label='manga' />
        </Tabs>
      </Paper>

      <br /><br />

      <Button
        className='signout'
        variant='outlined'
        color='primary'
        onClick={handleSignOutClick}>
        Sign Out
      </Button>

      <br /><br />

      <ItemList
        username={props.username}
        tab={tab}
        type='ongoing'
        refresh={refresh}
        toggleSnackbar={toggleSnackbar} />

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackbar}
        autoHideDuration={3000}
        onClose={toggleSnackbar}
        message="Link copied." />
    </div>
  );
}

export default Home;

/*
class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tab: 'anime',
      snackbarOpen: false,
    };

    if (!this.props.username || !this.props.token) {
      this.state = { leavePage: 'login' };
    }

    this.refresh            = this.refresh.bind(this);
    this.handleTab          = this.handleTab.bind(this);
    this.toggleSnackbar     = this.toggleSnackbar.bind(this);
    this.handleSignOutClick = this.handleSignOutClick.bind(this);
  }

  toggleSnackbar() {
    this.setState({ snackbarOpen: !this.state.snackbarOpen });
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
          refresh={this.refresh}
          toggleSnackbar={this.toggleSnackbar}/>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.snackbarOpen}
          autoHideDuration={3000}
          onClose={this.toggleSnackbar}
          message="Link copied."/>
      </div>
    );
  }
}

export default Home;
*/
