const mongoose = require('mongoose');

const animeSchema = new mongoose.Schema({
  // username of owner
  ownerId: {
    type: String,
    trim: true,
    required: true,
    immutable: true,
  },
  // title of anime
  title: {
    type: String,
    trim: true,
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
    trim: true,
    default: '',
  },
  // status: ongoing/completed/dropped
  status: {
    type: String,
    trim: true,
    default: 'ongoing',
  },
});

module.exports = mongoose.model('Anime', animeSchema);
