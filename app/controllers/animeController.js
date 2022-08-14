const Anime = require('../models/animeModel');

// @desc Query for animes
// @route GET /api/animes
// @param {string} req.query.status - optional
// @param {string} req.query.id - optional
// @sends {Object} anime, anime list
async function getAnimes(req, res) {
  // retrieve userId from token authentication
  const { userId } = res.locals;

  // query with id
  if (req.query.id) {
    const anime = Anime.findOne({
      _id: req.query.id,
      ownerId: userId,
    });

    if (!anime) {
      return res.status(400).send('Anime not found');
    }
    return res.status(200).json(anime);
  }

  // query with status
  if (req.query.status) {
    const animes = await Anime.find({
      ownerId: userId,
      status: req.query.status,
    });

    // returns empty object if no animes fit query
    if (Object.keys(animes).length === 0) {
      return res.status(400).send('No animes found');
    }
    return res.status(200).json(animes);
  }

  const animes = await Anime.find({ ownerId: userId });
  return res.status(200).json(animes);
}

// @desc  Add anime to user's list
// @route POST /api/animes
// @param {string} req.body.anime.title - required
// @sends {Object} newly created anime
async function createAnime(req, res) {
  // retrieve userId from token authentication
  const { userId } = res.locals;

  // parse body
  const { anime } = req.body;

  // verify inputs
  if (!anime.title) {
    return res.status(400).send('Title not provided');
  }

  anime.ownerId = userId;

  const newAnime = await Anime.create(anime);
  return res.status(200).json(newAnime);
}

// @desc   Find anime by id and update
// @route  PUT /api/animes/:id
// @param {string} req.params.id - required
// @param {Object} req.body.new - required
// @sends {Object} updated anime
async function updateAnime(req, res) {
  // retrieve userId from token authentication
  const { userId } = res.locals;

  // parse body
  const { newAnime } = req.body;

  // verify inputs
  if (!req.params.id) {
    return res.status(400).send('Anime id not provided');
  }
  if (!newAnime) {
    return res.status(400).send('New anime not provided');
  }

  const updatedAnime = await Anime.findOneAndUpdate(
    { _id: req.params.id, ownerId: userId },
    newAnime,
    { new: true },
  );
  return res.status(200).json(updatedAnime);
}

// @desc  Delete anime by ID
// @route DELETE /api/animes/:id
// @param {string} req.params.id - required
// @sends {Object} deleted anime
async function deleteAnime(req, res) {
  // retrieve userId from token authentication
  const { userId } = res.locals;

  if (!req.params.id) {
    return res.status(400).send('Anime id not provided');
  }

  const deletedAnime = await Anime.findOneAndDelete({
    _id: req.params.id,
    ownerId: userId,
  });

  if (!deletedAnime) {
    return res.status(400).send('Anime not found');
  }
  return res.status(200).json(deletedAnime);
}

module.exports = {
  getAnimes,
  createAnime,
  updateAnime,
  deleteAnime,
};
