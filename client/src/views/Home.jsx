import React, { useState, useReducer, useEffect } from 'react';
import { navigate } from "@reach/router";

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
        type={tab}
        status='ongoing'
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
