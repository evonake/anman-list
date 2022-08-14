const mongoose = require('mongoose');

const mangaSchema = new mongoose.Schema({
  // username of owner
  ownerId: {
    type: String,
    trim: true,
    required: true,
    immutable: true,
  },
  // title of manga
  title: {
    type: String,
    trim: true,
    required: true,
  },
  // saved chapter
  chapter: {
    type: Number,
    default: 1,
  },
  // link to read
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

module.exports = mongoose.model('Manga', mangaSchema);
