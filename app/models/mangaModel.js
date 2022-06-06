const mongoose = require('mongoose');

const mangaSchema = new mongoose.Schema({
  // username of owner
  username: {
    type: String,
    required: true,
    immutable: true,
  },
  // title of manga
  title: {
    type: String,
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
    default: '',
  },
  // status: ongoing/completed/dropped
  status: {
    type: String,
    default: 'ongoing',
  },
});

module.exports = mongoose.model('Manga', mangaSchema);
