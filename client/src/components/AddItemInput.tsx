import React from 'react';

import { TextField } from '@mui/material';

type Props = React.PropsWithChildren & {
  key?: string;
  className?: string;
  required?: boolean;
  type?: string;
  label?: string;
  error?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & typeof defaultProps;

const defaultProps = {
  key: '',
  className: 'input',
  required: false,
  type: 'text',
  label: '',
  error: '',
};

function AddItemInput({
  key,
  className,
  required,
  type,
  label,
  error,
  onChange,
  ...props
}: Props) {
  const value = props.children;

  return (
    <TextField
      key={key}
      className={className}
      variant="standard"
      required={required}
      type={type}
      label={label}
      error={!!error}
      value={value}
      helperText={error || ' '}
      onChange={onChange}
    />
  );
}
AddItemInput.defaultProps = defaultProps;

export default AddItemInput;
