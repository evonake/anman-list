const Manga = require('../models/mangaModel');

// @desc Query for mangas
// @route GET /api/:username/mangas
// @param {string} req.params.username - required
// @param {string} req.query.status - optional
// @param {string} req.query.id - optional
// @sends {Object} manga, manga list
async function getMangas(req, res) {
  // username required to query
  // consider using header token authentication??
  if (!req.params.username) {
    return res.status(401).send('Username not provided');
  }

  // query with id
  if (req.query.id) {
    const manga = Manga.findById(req.query.id);

    if (manga) {
      return res.status(200).json(manga);
    }
    return res.status(400).send('Manga not found');
  }

  // query with status
  if (req.query.status) {
    const mangas = await Manga.find({
      username: req.params.username,
      status: req.query.status,
    });

    // returns empty object if no mangas fit query
    return res.status(200).json(mangas);
  }

  const mangas = await Manga.find({ username: req.params.username });
  return res.status(200).json(mangas);
}

// @desc  Add manga to user's list
// @route POST /api/:username/mangas
// @param {string} req.params.username - required
// @param {string} req.body.manga.title - required
// @sends {Object} newly created manga
async function createManga(req, res) {
  if (!req.params.username) {
    return res.status(401).send('Username not provided');
  }
  req.body.manga.username = req.params.username;

  if (!req.body.manga.title) {
    return res.status(400).send('Title not provided');
  }

  const newManga = await Manga.create(req.body.manga);
  return res.status(200).json(newManga);
}

// @desc   Find manga by id and update
// @route  PUT /api/:username/mangas/:id
// @param {string} req.params.username - required
// @param {string} req.params.id - required
// @param {Object} req.body.new - required
// @sends {Object} updated manga
async function updateManga(req, res) {
  if (!req.params.username) {
    return res.status(401).send('Username not provided');
  }

  if (!req.params.id) {
    return res.status(400).send('Manga id not provided');
  }

  if (!req.body.new) {
    return res.status(400).send('New manga not provided');
  }

  const updatedManga = await Manga.findOneAndUpdate(
    { _id: req.params.id, username: req.params.username },
    req.body.new,
    { new: true },
  );
  return res.status(200).json(updatedManga);
}

// @desc  Delete manga by ID
// @route DELETE /api/:username/mangas/:id
// @param {string} req.params.username - required
// @param {string} req.params.id - required
// @sends {Object} deleted manga
async function deleteManga(req, res) {
  if (!req.params.username) {
    return res.status(401).send('Username not provided');
  }

  if (!req.params.id) {
    return res.status(400).send('Manga id not provided');
  }

  const deletedManga = await Manga.findOneAndDelete({
    _id: req.params.id,
    username: req.params.username,
  });

  if (!deletedManga) {
    return res.status(400).send('Manga not found');
  }
  return res.status(200).json(deletedManga);
}

module.exports = {
  getMangas,
  createManga,
  updateManga,
  deleteManga,
};
