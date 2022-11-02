import express from 'express';

import {
  getItems,
  addItem,
  updateItem,
  deleteItem,
} from '../controllers/itemController';
import {
  getItemList,
  addItemList,
  updateItemList,
  deleteItemList,
} from '../controllers/itemListController';

const router = express.Router();

router.route('/')
  .get(getItems)
  .post(addItem)
  .put(updateItem)
  .delete(deleteItem);

router.route('/lists')
  .get(getItemList)
  .post(addItemList)
  .put(updateItemList)
  .delete(deleteItemList);

export default router;
