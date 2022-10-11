import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';

import User from '../models/userModel';

declare global {
  namespace Express {
    interface User {
      _id: string;
    }
  }
}

function initPassport() {
  passport.use(new LocalStrategy.Strategy(async (username, password, callback) => {
    const user = await User.findOne({ username });
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
    const { _id } = user;
    callback(null, { _id });
  });

  passport.deserializeUser(async (_id, callback) => {
    const user = await User.findById(_id);
    callback(null, user);
  });
}

export default initPassport;
