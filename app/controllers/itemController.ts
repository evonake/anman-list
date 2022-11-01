import type { RequestHandler } from 'express';

import User from '../models/userModel';
import ItemList from '../models/itemListModel';
import Item from '../models/itemModel';
import { defaultItem, type TypeItem } from '../constants/modelTypes';

import resError from './misc';

/**
 * Gets all item lists for a user
 * @route GET /items
 * @returns {TypeItemList[]} 200 - array of items
 * @returns {Error}  400 - Invalid username
 */
export const getItems: RequestHandler = async (req, res) => {
  const { _id } = req.session.passport!.user;

  const user = await User.findById(_id);
  if (!user) {
    resError(res, { type: 'user', message: 'User does not exist.' });
    return;
  }

  const itemLists = await ItemList.find({ _id: { $in: user.lists } }).populate('items').lean();

  res.status(200).json({
    success: true,
    itemLists,
  });
};

/**
 * Adds an item to a user's list
 * @route POST /items
 * @param {string} req.body.itemListId - id of item list to add item to
 * @param {TypeItem} req.body.item - item to add
 * @returns {Object} 200 - success message
 * @returns {Error}  400 - Invalid username
 * @returns {Error}  400 - Invalid item
 */
export const addItem: RequestHandler = async (req, res) => {
  const { _id } = req.session.passport!.user;
  const { itemListId } = req.body;
  const item = { ...defaultItem, ...req.body.item };

  if (!itemListId || typeof itemListId !== 'string') {
    resError(res, { type: 'itemListId', message: 'Invalid item list id.' });
    return;
  }

  if (!item || (item as TypeItem).title === undefined) {
    resError(res, { type: 'item', message: 'Invalid item.' });
    return;
  }

  const user = await User.findById(_id);
  if (!user) {
    resError(res, { type: 'user', message: 'User does not exist.' });
    return;
  }
  if (!user.lists.includes(itemListId as any)) {
    resError(res, { type: 'itemListId', message: 'Item list does not exist.' });
    return;
  }
  const itemList = await ItemList.findById(itemListId);
  if (!itemList) {
    resError(res, { type: 'itemListId', message: 'Item list does not exist.' });
    return;
  }

  const newItem = await Item.create(item);
  itemList.items.push(newItem._id);
  await itemList.save();

  res.status(200).json({
    success: true,
  });
};

/**
 * Updates an item from a user's list
 * @route PUT /items
 * @param {string} req.body.itemListId - id of item list that contains item to update
 * @param {TypeItem} req.body.item - item to update
 * @returns {Object} 200 - success message
 * @returns {Error}  400 - Invalid username
 * @returns {Error}  400 - Invalid item
 */
export const updateItem: RequestHandler = async (req, res) => {
  const { _id } = req.session.passport!.user;
  const { itemListId, item } = req.body;

  if (!itemListId || typeof itemListId !== 'string') {
    resError(res, { type: 'itemListId', message: 'Invalid item list id.' });
    return;
  }
  if (!item || (item as TypeItem)._id === undefined) {
    resError(res, { type: 'item', message: 'Invalid item.' });
    return;
  }

  const user = await User.findById(_id);
  if (!user) {
    resError(res, { type: 'user', message: 'User does not exist.' });
    return;
  }
  if (!user.lists.includes(itemListId as any)) {
    resError(res, { type: 'itemListId', message: 'Item list does not exist.' });
    return;
  }
  const itemList = await ItemList.findById(itemListId);
  if (!itemList) {
    resError(res, { type: 'itemListId', message: 'Item list does not exist.' });
    return;
  }
  if (!itemList.items.includes(item._id)) {
    resError(res, { type: 'item', message: 'Item does not exist.' });
    return;
  }

  await Item.findByIdAndUpdate(item._id, item);

  res.status(200).json({
    success: true,
  });
};

/**
 * Deletes an item from a user's list
 * @route DELETE /items/:itemId
 * @param {string} req.query.itemListId - id of item list that contains item to delete
 * @param {String} req.query.itemId - id of item to delete
 * @returns {Object} 200 - success message
 * @returns {Error}  400 - Invalid username
 * @returns {Error}  400 - Invalid item id
 */
export const deleteItem: RequestHandler = async (req, res) => {
  const { _id } = req.session.passport!.user;
  const { itemListId, itemId } = req.query;

  if (!itemListId || typeof itemListId !== 'string') {
    resError(res, { type: 'itemListId', message: 'Invalid item list id.' });
    return;
  }
  if (!itemId || typeof itemListId !== 'string') {
    resError(res, { type: 'itemId', message: 'Invalid item id.' });
    return;
  }

  const user = await User.findById(_id);
  if (!user) {
    resError(res, { type: 'user', message: 'User does not exist.' });
    return;
  }
  if (!user.lists.includes(itemListId as any)) {
    resError(res, { type: 'itemListId', message: 'Item list does not exist.' });
    return;
  }
  const itemList = await ItemList.findById(itemListId);
  if (!itemList) {
    resError(res, { type: 'itemListId', message: 'Item list does not exist.' });
    return;
  }
  if (!itemList.items.includes(itemId as any)) {
    resError(res, { type: 'itemId', message: 'Item does not exist.' });
    return;
  }
  itemList.items = itemList.items.filter((id) => id.toString() !== itemId);
  await itemList.save();

  await Item.findByIdAndDelete(itemId);

  res.status(200).json({
    success: true,
  });
};
