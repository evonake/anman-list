import { RequestHandler } from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';

import User from '../models/userModel';

const SALT_ROUNDS = 12;

// { withCredentials: true } for axios
export const login: RequestHandler = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username) {
    res.status(400).json({
      success: false,
      type: 'username',
      message: 'Username is required.',
    });
    return;
  }
  if (!password) {
    res.status(400).json({
      success: false,
      type: 'password',
      message: 'Password is required.',
    });
    return;
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      res.status(500).json({
        success: false,
        type: 'server',
        message: 'Server error.',
      });
      return;
    }
    if (!user) {
      res.status(400).json({
        success: false,
        type: info.message.includes('Username') ? 'username' : 'password',
        message: info.message,
      });
      return;
    }

    req.login(user, (errLogin) => {
      if (errLogin) {
        res.status(500).json({
          success: false,
          type: 'server',
          message: 'Server error.',
        });
      }

      res.status(200).json({
        success: true,
      });
    });
  })(req, res, next);
};

export const register: RequestHandler = async (req, res) => {
  const { username, password } = req.body;

  // vaildate inputs
  if (!username) {
    res.status(400).json({
      success: false,
      type: 'username',
      message: 'Username is required.',
    });
    return;
  }
  if (!password) {
    res.status(400).json({
      success: false,
      type: 'password',
      message: 'Password is required.',
    });
    return;
  }

  const userExists = await User.exists({ username });
  if (userExists) {
    res.status(400).json({
      success: false,
      type: 'username',
      message: 'Username already exists.',
    });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  User.create({
    username,
    password: hashedPassword,
  });

  res.status(200).json({
    success: true,
  });
};

export const logout: RequestHandler = async (req, res) => {
  req.logout((err) => {
    if (err) {
      res.status(500).json({
        success: false,
        type: 'server',
        message: 'Server error.',
      });
    }
    res.status(200).json({
      success: true,
    });
  });
};
