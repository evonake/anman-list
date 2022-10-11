import { RequestHandler } from 'express';

import User from '../models/userModel';
import Item from '../models/itemModel';
import type { TypeItem } from '../constants/modelTypes';

/**
 * Get's all user's items
 * @route GET /items
 * @returns {TypeItem[]} 200 - array of items
 * @returns {Error}  400 - Invalid username
 */
export const getItems: RequestHandler = async (req, res) => {
  const { _id } = req.session.passport!.user;

  const user = await User.findById(_id);
  if (!user) {
    res.status(400).json({
      success: false,
      type: 'username',
      message: 'Username does not exist.',
    });
    return;
  }

  const items = await Item.find({ _id: { $in: user.itemIds } });

  res.status(200).json({
    success: true,
    items,
  });
};

/**
 * Adds an item to a user's list
 * @route POST /items
 * @param {TypeItem} req.body.item - item to add
 * @returns {Object} 200 - success message
 * @returns {Error}  400 - Invalid username
 * @returns {Error}  400 - Invalid item
 */
export const addItem: RequestHandler = async (req, res) => {
  const { _id } = req.session.passport!.user;
  const { item } = req.body;

  if (!item || (item as TypeItem).title === undefined) {
    res.status(400).json({
      success: false,
      type: 'item',
      message: 'Invalid item.',
    });
    return;
  }

  const user = await User.findById(_id);
  if (!user) {
    res.status(400).json({
      success: false,
      type: 'username',
      message: 'Username does not exist.',
    });
    return;
  }

  const newItem = await Item.create(item);
  user.itemIds.push(newItem._id);
  user.save();

  res.status(200).json({
    success: true,
  });
};

/**
 * Deletes an item from a user's list
 * @route DELETE /items
 * @param {ObjectId} req.body.itemId - id of item to delete
 * @returns {Object} 200 - success message
 * @returns {Error}  400 - Invalid username
 * @returns {Error}  400 - Invalid item id
 */
export const deleteItem: RequestHandler = async (req, res) => {
  const { _id } = req.session.passport!.user;
  const { itemId } = req.body;

  if (!itemId) {
    res.status(400).json({
      success: false,
      type: 'itemId',
      message: 'Item id is required.',
    });
    return;
  }

  // remove item from user itemId list
  const user = await User.findById(_id);
  if (!user) {
    res.status(400).json({
      success: false,
      type: 'username',
      message: 'Username does not exist.',
    });
    return;
  }
  user.itemIds = user.itemIds.filter((id) => id.toString() !== itemId);
  user.save();

  // delete item document
  await Item.findByIdAndDelete(itemId);

  res.status(200).json({
    success: true,
  });
};

/**
 * Updates an item from a user's list
 * @route PUT /items
 * @param {TypeItem} req.body.item - item to update
 * @returns {Object} 200 - success message
 * @returns {Error}  400 - Invalid username
 * @returns {Error}  400 - Invalid item
 */
export const updateItem: RequestHandler = async (req, res) => {
  const { _id } = req.session.passport!.user;
  const { item } = req.body;

  if (!item) {
    res.status(400).json({
      success: false,
      type: 'item',
      message: 'Item is required.',
    });
    return;
  }

  const user = await User.findById(_id);
  if (!user) {
    res.status(400).json({
      success: false,
      type: 'username',
      message: 'Username does not exist.',
    });
    return;
  }

  if (!user.itemIds.includes(item._id)) {
    res.status(400).json({
      success: false,
      type: 'item',
      message: 'Item does not exist.',
    });
    return;
  }

  await Item.findByIdAndUpdate(item._id, item);

  res.status(200).json({
    success: true,
  });
};
