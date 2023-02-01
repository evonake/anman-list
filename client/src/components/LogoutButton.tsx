import React from 'react';

import LoadingButton from '@mui/lab/LoadingButton';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { logoutThunk, selectUserReqStatus } from '../redux/features/userSlice';

function LogoutButton() {
  const dispatch = useAppDispatch();

  const reqStatus = useAppSelector(selectUserReqStatus);

  const handleSubmit = () => {
    dispatch(logoutThunk());
  };

  return (
    <LoadingButton
      variant="contained"
      onClick={handleSubmit}
      loading={reqStatus === 'pending'}
    >
      Logout
    </LoadingButton>
  );
}

export default LogoutButton;
