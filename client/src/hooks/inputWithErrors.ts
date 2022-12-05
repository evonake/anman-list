import React, { useState, useEffect } from 'react';

import { useAppSelector } from '../redux/hooks';
import type { RootState } from '../redux/store';
import type TypeError from '../types/error';

type MyObject = {
  [key: string]: string | number;
};

function useInputWithErrors<T extends MyObject>(
  initialInputs: T,
  errorSelector: (state: RootState) => TypeError,
  optionalInputs: (keyof T)[] = [],
) {
  type E = { [key in keyof T]?: string };

  const initialErrors: E = {};
  Object.keys(initialInputs).forEach((key: keyof T) => {
    initialErrors[key] = '';
  });

  const error = useAppSelector(errorSelector);

  const [inputs, setInputs] = useState<T>(initialInputs);
  const [errors, setErrors] = useState<E>(initialErrors);

  Object.keys(inputs).forEach((key) => {
    useEffect(() => {
      setErrors({ ...errors, [key]: '' });
    }, [inputs[key]]);
  });
  useEffect(() => {
    if (error.type) {
      setErrors({ ...errors, [error.type]: error.message });
    }
  }, [error]);

  const handleInputChange = (prop: keyof T) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [prop]: e.target.value });
  };

  const setError = (prop: keyof E, message: string) => {
    setErrors({ ...errors, [prop]: message });
  };

  const validate = () => {
    let valid = true;
    const errorsCopy = { ...errors };

    Object.keys(inputs).forEach((key: keyof T) => {
      if (!inputs[key] && !optionalInputs.includes(key)) {
        const capitalizedKey = String(key).charAt(0).toUpperCase() + String(key).slice(1);
        errorsCopy[key] = `${capitalizedKey} is required!`;
        valid = false;
      }
    });

    if (!valid) {
      setErrors(errorsCopy);
    }

    return valid;
  };

  const reset = () => {
    setInputs(initialInputs);
  };

  return {
    inputs,
    handleInputChange,
    errors,
    setError,
    validate,
    reset,
  };
}

export default useInputWithErrors;
