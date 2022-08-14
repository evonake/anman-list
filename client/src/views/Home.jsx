import React, {
  useState,
  useReducer,
  useEffect,
} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Tab,
  Tabs,
  Paper,
  Button,
  Snackbar,
} from '@mui/material';

import { logout } from '../api/user';
import { fetchAnime } from '../api/anime';
import ItemList from '../components/ItemList';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [tab, changeTab] = useState('anime');
  const [snackbar, toggleSnackbar] = useReducer((s, _) => !s, false);

  useEffect(() => {
    dispatch()
  }, [tab]);

  const handleSignOutClick = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="Home">
      <Paper>
        <Tabs
          value={tab}
          onChange={(_, v) => changeTab(v)}
          centered
        >
          <Tab value="anime" label="anime" />
          <Tab value="manga" label="manga" />
        </Tabs>
      </Paper>

      <br />
      <br />

      <Button
        className="signout"
        variant="outlined"
        color="primary"
        onClick={handleSignOutClick}
      >
        Sign Out
      </Button>

      <br />
      <br />

      <ItemList
        type={tab}
        status="ongoing"
        toggleSnackbar={toggleSnackbar}
      />

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackbar}
        autoHideDuration={3000}
        onClose={toggleSnackbar}
        message="Link copied."
      />
    </div>
  );
}

export default Home;
