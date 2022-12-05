import React from 'react';

import {
  Button,
} from '@mui/material';

import { useAppDispatch } from '../redux/hooks';
import { logoutThunk } from '../redux/features/userSlice';

function LogoutButton() {
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    dispatch(logoutThunk());
  };

  return (
    <div>
      <Button variant="contained" onClick={handleSubmit}>Logout</Button>
    </div>
  );
}

export default LogoutButton;
