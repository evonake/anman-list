import React from 'react';

import { TextField } from '@mui/material';

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

function AddItemInput({
  label,
  error = '',
  onChange,
  type = 'text',
  ...props
}: Props) {
  const value = props.children;

  return (
    <TextField
      className="input"
      variant="standard"
      type={type}
      error={!!error}
      label={label}
      value={value}
      helperText={error || ' '}
      onChange={onChange}
    />
  );
}
AddItemInput.defaultProps = defaultProps;

export default AddItemInput;
