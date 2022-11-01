import type { Response } from 'express';

import type TypeResError from '../constants/misc';

const resError = (res: Response, error: TypeResError) => {
  res.status(400).json({
    success: false,
    error,
  });
};

export default resError;
