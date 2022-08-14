const Manga = require('../models/mangaModel');

// @desc Query for mangas
// @route GET /api/mangas
// @param {string} req.query.status - optional
// @param {string} req.query.id - optional
// @sends {Object} manga, manga list
async function getMangas(req, res) {
  // retrieve userId from token authentication
  const { userId } = res.locals;

  // query with id
  if (req.query.id) {
    const manga = Manga.findOne({
      _id: req.query.id,
      ownerId: userId,
    });

    if (!manga) {
      return res.status(400).send('Manga not found');
    }
    return res.status(200).json(manga);
  }

  // query with status
  if (req.query.status) {
    const mangas = await Manga.find({
      ownerId: userId,
      status: req.query.status,
    });

    // returns empty object if no mangas fit query
    if (Object.keys(mangas).length === 0) {
      return res.status(400).send('No mangas found');
    }
    return res.status(200).json(mangas);
  }

  const mangas = await Manga.find({ ownerId: userId });
  return res.status(200).json(mangas);
}

// @desc  Add manga to user's list
// @route POST /api/mangas
// @param {string} req.body.manga.title - required
// @sends {Object} newly created manga
async function createManga(req, res) {
  // retrieve userId from token authentication
  const { userId } = res.locals;

  // parse body
  const { manga } = req.body;

  // verify inputs
  if (!manga.title) {
    return res.status(400).send('Title not provided');
  }

  manga.ownerId = userId;

  const newManga = await Manga.create(manga);
  return res.status(200).json(newManga);
}

// @desc   Find manga by id and update
// @route  PUT /api/mangas/:id
// @param {string} req.params.id - required
// @param {Object} req.body.new - required
// @sends {Object} updated manga
async function updateManga(req, res) {
  // retrieve userId from token authentication
  const { userId } = res.locals;

  // parse body
  const { newManga } = req.body;

  // verify inputs
  if (!req.params.id) {
    return res.status(400).send('Manga id not provided');
  }
  if (!newManga) {
    return res.status(400).send('New manga not provided');
  }

  const updatedManga = await Manga.findOneAndUpdate(
    { _id: req.params.id, ownerId: userId },
    newManga,
    { new: true },
  );
  return res.status(200).json(updatedManga);
}

// @desc  Delete manga by ID
// @route DELETE /api/mangas/:id
// @param {string} req.params.id - required
// @sends {Object} deleted manga
async function deleteManga(req, res) {
  // retrieve userId from token authentication
  const { userId } = res.locals;

  if (!req.params.id) {
    return res.status(400).send('Manga id not provided');
  }

  const deletedManga = await Manga.findOneAndDelete({
    _id: req.params.id,
    ownerId: userId,
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
