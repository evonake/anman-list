const express = require('express');
require('express-async-errors');
require('dotenv').config();
const { connectDB } = require('./config/db');

const port = process.env.PORT || 5000;

connectDB();

const app = express();

// middleware
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api/:username/users', require('./routes/userRoutes'));
app.use('/api/:username/animes', require('./routes/animeRoutes'));
app.use('/api/:username/mangas', require('./routes/mangaRoutes'));

app.listen(port, () => console.log(`Server started on port ${port}`));
