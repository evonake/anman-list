import express from 'express';

import {
  getItems,
  addItem,
  deleteItem,
  updateItem,
} from '../controllers/itemController';

const router = express.Router();

router.route('/')
  .get(getItems)
  .post(addItem)
  .put(updateItem);

router.route('/:itemId')
  .delete(deleteItem);

export default router;
