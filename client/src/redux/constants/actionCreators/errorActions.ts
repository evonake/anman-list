import type TypeError from '../../../types/error';
import ERROR_SET from '../actionNames/errorEvents';

const errorSet = (error: TypeError) => ({
  type: ERROR_SET,
  payload: error,
});

export default errorSet;
