const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const SALT = 10;

// @desc Logs in user
// @route POST /api/users/login
// @param {string} req.body.username - required
// @param {string} req.body.password - required
// @sends {Object} user
async function login(req, res) {
  // parse inputs
  const { username, password } = req.body;

  // verify inputs
  if (!username) {
    return res.status(400).json({
      errorType: 'username',
      errorMessage: 'Username not provided',
    });
  }
  if (!password) {
    return res.status(400).json({
      errorType: 'password',
      errorMessage: 'Password not provided',
    });
  }

  // find user
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({
      errorType: 'username',
      errorMessage: 'User not found',
    });
  }

  // verify password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({
      errorType: 'password',
      errorMessage: 'Password is incorrect',
    });
  }

  req.session.userId = user._id;

  return res.status(200).json({
    success: true,
  });
}

// @desc Registers new user
// @route POST /api/users/register
// @param {string} req.body.username - required
// @param {string} req.body.password - required
// @param {string} req.body.confirm - required
// @sends {Object} user
async function register(req, res) {
  // parse inputs
  const { username, password, confirm } = req.body;

  // verify inputs
  if (!username) {
    return res.status(401).json({
      errorType: 'username',
      errorMessage: 'Username not provided',
    });
  }
  if (!password) {
    return res.status(401).json({
      errorType: 'password',
      errorMessage: 'Password not provided',
    });
  }
  if (!confirm) {
    return res.status(401).json({
      errorType: 'confirm',
      errorMessage: 'Confirm password not provided',
    });
  }

  // verify password and confirm
  if (password !== confirm) {
    return res.status(401).json({
      errorType: 'confirm',
      errorMessage: 'Passwords do not match',
    });
  }

  // check if username already exists
  const userExists = await User.exists({ username });
  if (userExists) {
    return res.status(401).json({
      errorType: 'username',
      errorMessage: 'Username already exists',
    });
  }

  // hash password using bcrypt
  const hashedPassword = await bcrypt.hash(password, SALT);
  const user = await User.create({
    username,
    password: hashedPassword,
  });

  // create authentication token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  user.token = token;
  user.save();

  return res.status(200).json({
    success: true,
  });
}

// @desc Logs out user and destroys session
// @route GET /api/users/logout
// @sends {string} message
function logout(req, res) {
  req.session.destroy();
  return res.status(200).send('Logged out');
}

module.exports = {
  login,
  register,
  logout,
};
