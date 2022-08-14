const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('express-async-errors');
require('dotenv').config();
const { connectDB } = require('./config/db');

const port = process.env.PORT || 5000;

const clientPromise = connectDB();

const app = express();

// middleware
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60,
  },
  store: MongoStore.create({
    clientPromise,
  }),
}));

// routes
app.use('/api/users', require('./routes/userRoutes'));
app.use(require('./middleware/sessionAuth'));
app.use('/api/animes', require('./routes/animeRoutes'));
app.use('/api/mangas', require('./routes/mangaRoutes'));

app.listen(port, () => console.log(`Server started on port ${port}`));
