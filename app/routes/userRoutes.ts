import express from 'express';

import { login, logout, register } from '../controllers/userController';

const router = express.Router();

router.route('/login').post(login);
router.route('/register').post(register);
router.route('/logout').post(logout);

export default router;
