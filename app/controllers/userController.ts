import { RequestHandler } from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';

import User from '../models/userModel';

import resError from './misc';

const SALT_ROUNDS = 12;

// { withCredentials: true } for axios
/**
 * Login a user
 * @route POST /users/login
 * @param {string} req.body.username - username of user
 * @param {string} req.body.password - password of user
 * @returns {Object} 200 - success message with username
 * @returns {Error}  400 - Invalid username
 * @returns {Error}  400 - Invalid password
 * @returns {Error}  500 - Server error
 */
export const login: RequestHandler = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username) {
    resError(res, { type: 'username', message: 'Invalid username.' });
    return;
  }
  if (!password) {
    resError(res, { type: 'password', message: 'Invalid password.' });
    return;
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      res.status(500).json({
        success: false,
        error: {
          type: 'server',
          message: 'Server error.',
        },
      });
      return;
    }
    if (!user) {
      resError(res, {
        type: info.message.includes('Username') ? 'username' : 'password',
        message: info.message,
      });
      return;
    }

    req.login(user, (errLogin) => {
      if (errLogin) {
        res.status(500).json({
          success: false,
          error: {
            type: 'server',
            message: 'Server error.',
          },
        });
      }

      res.status(200).json({
        success: true,
        username,
      });
    });
  })(req, res, next);
};

/**
 * Register a user
 * @route POST /users/register
 * @param {string} req.body.username - username of user
 * @param {string} req.body.password - password of user
 * @returns {Object} 200 - success message
 * @returns {Error}  400 - Invalid username
 * @returns {Error}  400 - Invalid password
 */
export const register: RequestHandler = async (req, res) => {
  const { username, password } = req.body;

  // vaildate inputs
  if (!username) {
    resError(res, { type: 'username', message: 'Invalid username.' });
    return;
  }
  if (!password) {
    resError(res, { type: 'password', message: 'Invalid password.' });
    return;
  }

  const userExists = await User.exists({ username });
  if (userExists) {
    resError(res, { type: 'username', message: 'Username already exists.' });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  await User.create({
    username,
    password: hashedPassword,
  });

  res.status(200).json({
    success: true,
  });
};

/**
 * Logout a user and terminate session
 * @route POST /users/logout
 * @returns {Object} 200 - success message
 * @returns {Error}  500 - Server error
 */
export const logout: RequestHandler = async (req, res) => {
  req.logout((err) => {
    if (err) {
      res.status(500).json({
        success: false,
        error: {
          type: 'server',
          message: 'Server error.',
        },
      });
    }
    res.status(200).json({
      success: true,
    });
  });
};

/**
 * Check if user is logged in
 * @route GET /users/auth
 * @returns {Object} 200 - success message with username
 * @returns {Error}  401 - Not authenticated
 */
export const auth: RequestHandler = async (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({
      success: true,
      username: req.session.passport!.user.username,
    });
  } else {
    res.status(200).json({
      success: false,
      error: {
        type: 'auth',
        message: 'Not authenticated.',
      },
    });
  }
};
