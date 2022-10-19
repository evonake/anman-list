import React from 'react';

import {
  Stack,
  Typography,
} from '@mui/material';

import '../styles/components/loginlabel.css';

type Props = {
  className?: string;
} & typeof defaultProps;
const defaultProps = {
  className: '',
};
function LoginLabel({ className }: Props) {
  return (
    <div className={className}>
      <Stack
        id="loginlabel-container"
        spacing={4}
      >
        <Typography variant="h3">Log In</Typography>
        <Typography variant="body2">Welcome back! Please log in to your account.</Typography>
      </Stack>
    </div>
  );
}
LoginLabel.defaultProps = defaultProps;

export default LoginLabel;
