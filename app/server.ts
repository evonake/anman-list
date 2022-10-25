import * as dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';

import initDB from './config/db';
import initPassport from './config/passport';

import auth from './middleware/auth';

import userRoutes from './routes/userRoutes';
import itemRoutes from './routes/itemRoutes';

// add typing for req.session
declare module 'express-session' {
  interface SessionData {
    passport: {
      user: {
        _id: string;
      }
    };
  }
}
declare module 'passport' {
  interface IVerifyOptions {
    type: string;
    message: string;
  }
}

dotenv.config();

const PORT = process.env.PORT || 5000;

const clientPromise = initDB();
initPassport();

const app = express();

// app.use(express.static(path.join(__dirname, 'public')));

// middleware - general
app.use(express.json());
// app.use(express.urlencoded({ extended: false })); // <-- needed for axios

// middleware - session
app.use(session({
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  cookie: {
    // secure: true, // <-- set to true in production
    maxAge: 1000 * 60 * 60,
  },
  store: MongoStore.create({ clientPromise }),
}));

// middleware - passport
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/users', userRoutes);
app.use('/items', auth, itemRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
