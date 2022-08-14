const mongoose = require('mongoose');

// const animeSchema = require('./submodels/animeModel').schema;
// const mangaSchema = require('./submodels/mangaModel').schema;

const userSchema = new mongoose.Schema({
  // username (used in login) (unique)
  username: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  // password (encrypted with bcrypt)
  password: {
    type: String,
    trim: true,
    required: true,
  },
});

module.exports = mongoose.model('User', userSchema);
