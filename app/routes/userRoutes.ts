import express from 'express';

import {
  login,
  logout,
  register,
  auth,
} from '../controllers/userController';

const router = express.Router();

router.route('/login').post(login);
router.route('/register').post(register);
router.route('/logout').post(logout);
router.route('/auth').get(auth);

export default router;
