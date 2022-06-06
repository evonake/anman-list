const express = require('express');
const {
  getAnimes,
  createAnime,
  updateAnime,
  deleteAnime,
} = require('../controllers/animeController');

const router = express.Router({ mergeParams: true });

router.route('/').get(getAnimes).post(createAnime);
router.route('/:id').put(updateAnime).delete(deleteAnime);

module.exports = router;
