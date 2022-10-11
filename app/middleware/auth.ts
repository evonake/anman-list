import { RequestHandler } from 'express';

const auth: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({
    type: 'auth',
    message: 'Not authenticated.',
  });
};

export default auth;
