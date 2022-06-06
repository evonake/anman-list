const express = require('express');
const {
  getMangas,
  createManga,
  updateManga,
  deleteManga,
} = require('../controllers/mangaController');

const router = express.Router({ mergeParams: true });

router.route('/').get(getMangas).post(createManga);
router.route('/:id').put(updateManga).delete(deleteManga);

module.exports = router;
