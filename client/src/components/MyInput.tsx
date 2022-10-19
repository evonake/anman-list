/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';

import {
  // Input,
  // InputLabel,
  InputAdornment,
  IconButton,
  // FormControl,
  // FormHelperText,
  TextField,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

type Props = React.PropsWithChildren & {
  label: string;
  error?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
} & typeof defaultProps;

const defaultProps = {
  error: '',
  type: 'text',
};

function MyInput({
  label,
  error = '',
  onChange,
  type = 'text',
  ...props
}: Props) {
  const [hidePassword, setHidePassword] = useState(true);
  const value = props.children;

  const isPasswordType = label === 'Password' || label === 'Confirm';

  const endAdornment = isPasswordType && value ? (
    <InputAdornment position="end">
      <IconButton onClick={() => setHidePassword(!hidePassword)}>
        {hidePassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  ) : null;

  return (
    <TextField
      className="input"
      variant="standard"
      type={isPasswordType ? (hidePassword ? 'password' : 'text') : type}
      error={!!error}
      label={label}
      value={value}
      helperText={error || ' '}
      onChange={onChange}
      InputProps={{
        endAdornment,
      }}
    />
  );
}
MyInput.defaultProps = defaultProps;

export default MyInput;
