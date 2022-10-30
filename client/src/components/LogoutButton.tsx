import React from 'react';

import {
  Button,
} from '@mui/material';

import { useAppDispatch } from '../redux/hooks';
import { userLogout } from '../redux/constants/actionCreators/userActions';

function LogoutButton() {
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    dispatch(userLogout());
  };

  return (
    <div>
      <Button variant="contained" onClick={handleSubmit}>Logout</Button>
    </div>
  );
}

export default LogoutButton;
