const mongoose = require('mongoose');

const animeSchema = new mongoose.Schema({
  // username of owner
  username: {
    type: String,
    required: true,
    immutable: true,
  },
  // title of anime
  title: {
    type: String,
    required: true,
  },
  // saved episode
  episode: {
    type: Number,
    default: 1,
  },
  // saved season
  season: {
    type: Number,
    default: 1,
  },
  // link to watch
  link: {
    type: String,
    default: '',
  },
  // status: ongoing/completed/dropped
  status: {
    type: String,
    default: 'ongoing',
  },
});

module.exports = mongoose.model('Anime', animeSchema);
