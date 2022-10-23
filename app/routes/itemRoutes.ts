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
  .put(updateItem)
  .delete(deleteItem);

export default router;
