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
function RegisterLabel({ className }: Props) {
  return (
    <div className={className}>
      <Stack
        id="registerlabel-container"
        spacing={4}
      >
        <Typography variant="h3">Create an Account</Typography>
        <Typography variant="body2">Welcome! Please create a new account.</Typography>
      </Stack>
    </div>
  );
}
RegisterLabel.defaultProps = defaultProps;

export default RegisterLabel;
