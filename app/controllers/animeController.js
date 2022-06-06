const Anime = require('../models/animeModel');

// @desc Query for animes
// @route GET /api/:username/animes
// @param {string} req.params.username - required
// @param {string} req.query.status - optional
// @param {string} req.query.id - optional
// @sends {Object} anime, anime list
async function getAnimes(req, res) {
  // username required to query
  // consider using header token authentication??
  if (!req.params.username) {
    return res.status(401).send('Username not provided');
  }

  // query with id
  if (req.query.id) {
    const anime = Anime.findById(req.query.id);

    if (anime) {
      return res.status(200).json(anime);
    }
    return res.status(400).send('Anime not found');
  }

  // query with status
  if (req.query.status) {
    const animes = await Anime.find({
      username: req.params.username,
      status: req.query.status,
    });

    // returns empty object if no animes fit query
    return res.status(200).json(animes);
  }

  const animes = await Anime.find({ username: req.params.username });
  return res.status(200).json(animes);
}

// @desc  Add anime to user's list
// @route POST /api/:username/animes
// @param {string} req.params.username - required
// @param {string} req.body.anime.title - required
// @sends {Object} newly created anime
async function createAnime(req, res) {
  if (!req.params.username) {
    return res.status(401).send('Username not provided');
  }
  req.body.anime.username = req.params.username;

  if (!req.body.anime.title) {
    return res.status(400).send('Title not provided');
  }

  const newAnime = await Anime.create(req.body.anime);
  return res.status(200).json(newAnime);
}

// @desc   Find anime by id and update
// @route  PUT /api/:username/animes/:id
// @param {string} req.params.username - required
// @param {string} req.params.id - required
// @param {Object} req.body.new - required
// @sends {Object} updated anime
async function updateAnime(req, res) {
  if (!req.params.username) {
    return res.status(401).send('Username not provided');
  }

  if (!req.params.id) {
    return res.status(400).send('Anime id not provided');
  }

  if (!req.body.new) {
    return res.status(400).send('New anime not provided');
  }

  const updatedAnime = await Anime.findOneAndUpdate(
    { _id: req.params.id, username: req.params.username },
    req.body.new,
    { new: true },
  );
  return res.status(200).json(updatedAnime);
}

// @desc  Delete anime by ID
// @route DELETE /api/:username/animes/:id
// @param {string} req.params.username - required
// @param {string} req.params.id - required
// @sends {Object} deleted anime
async function deleteAnime(req, res) {
  if (!req.params.username) {
    return res.status(401).send('Username not provided');
  }

  if (!req.params.id) {
    return res.status(400).send('Anime id not provided');
  }

  const deletedAnime = await Anime.findOneAndDelete({
    _id: req.params.id,
    username: req.params.username,
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
