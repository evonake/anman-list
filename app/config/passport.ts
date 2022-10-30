import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';

import User from '../models/userModel';

function initPassport() {
  passport.use(new LocalStrategy.Strategy(async (username, password, callback) => {
    const user = await User.findOne({ username }).select('username password');
    if (!user) {
      return callback(null, false, { message: 'Username does not exist.' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return callback(null, false, { message: 'Incorrect password.' });
    }

    return callback(null, user);
  }));

  passport.serializeUser((user: Express.User, callback) => {
    const { _id, username } = user;
    callback(null, { _id, username });
  });

  passport.deserializeUser(async (_id, callback) => {
    const user = await User.findById(_id).select('username');
    callback(null, user);
  });
}

export default initPassport;
