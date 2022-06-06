const express = require('express');
const { getUser, createUser } = require('../controllers/userController');

const router = express.Router({ mergeParams: true });

router.route('/').get(getUser).post(createUser);

module.exports = router;
