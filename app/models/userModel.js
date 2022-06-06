const mongoose = require('mongoose');

// const animeSchema = require('./submodels/animeModel').schema;
// const mangaSchema = require('./submodels/mangaModel').schema;

const userSchema = new mongoose.Schema({
  // username (used in login) (unique)
  username: {
    type: String,
    required: true,
    unique: true,
  },
  // password (encrypted with bcrypt)
  password: {
    type: String,
    required: true,
  },
  // authetication token
  token: String,
});

module.exports = mongoose.model('User', userSchema);
