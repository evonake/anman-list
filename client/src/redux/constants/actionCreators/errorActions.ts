import type TypeError from '../../../types/error';
import { ERROR_SET, ERROR_RESET } from '../actionNames/errorEvents';

export const errorSet = (error: TypeError) => ({
  type: ERROR_SET,
  payload: error,
});

export const errorReset = () => ({
  type: ERROR_RESET,
});
