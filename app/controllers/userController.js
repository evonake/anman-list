const User = require('../models/userModel');

// @desc Gets user by username
// @route GET /api/:username/users
// @param {string} req.params.username -
// @sends {Object} user
async function getUser(req, res) {
  if (!req.params.username) {
    return res.status(401).send('Username not provided');
  }

  const user = await User.findOne({ username: req.params.username });

  return res.status(200).json(user);
}

// @desc Creates a new user
// @route POST /api/users
// @param {string} req.body.username - required
// @param {string} req.body.password - required
// @sends {Object} user
async function createUser(req, res) {
  if (!req.body.username) {
    return res.status(400).send('Username not provided');
  }

  const usernameTaken = await User.exists({ username: req.body.username });
  if (usernameTaken) {
    return res.status(400).send('Username taken');
  }

  const user = await User.create(req.body);
  return res.status(200).json(user);
}

module.exports = {
  getUser,
  createUser,
};
