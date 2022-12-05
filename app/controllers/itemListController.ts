import type { RequestHandler } from 'express';

import type { ObjectId } from 'mongoose';

import User from '../models/userModel';
import ItemList from '../models/itemListModel';
import Item from '../models/itemModel';
import { defaultItemList, type TypeItemList } from '../constants/modelTypes';

import resError from './misc';

/**
 * Gets an item list by id
 * @route GET /items/lists
 * @param {TypeItemList} req.query.itemListId - item list id to get
 * @returns {Object} 200 - success message with itemList
 * @returns {Error}  400 - Invalid username
 * @returns {Error}  400 - Invalid item list
 */
export const getItemList: RequestHandler = async (req, res) => {
  const { _id } = req.session.passport!.user;
  const { itemListId } = req.query;

  if (!itemListId || typeof itemListId !== 'string') {
    resError(res, { type: 'itemListId', message: 'Invalid item list id.' });
    return;
  }

  const user = await User.findById(_id);
  if (!user) {
    resError(res, { type: 'user', message: 'User does not exist.' });
    return;
  }
  if (!user.lists.includes(itemListId as any)) {
    resError(res, { type: 'itemList', message: 'Item list does not exist.' });
    return;
  }
  const itemList = await ItemList.findById(itemListId).populate('items').lean();
  if (!itemList) {
    resError(res, { type: 'itemList', message: 'Item list does not exist.' });
  }

  res.status(200).json({
    success: true,
    itemList,
  });
};

/**
 * Adds an item list to a user
 * @route POST /items/lists
 * @param {TypeItemList} req.body.itemList - item list to add
 * @returns {Object} 200 - success message
 * @returns {Error}  400 - Invalid username
 * @returns {Error}  400 - Invalid item list
 */
export const addItemList: RequestHandler = async (req, res) => {
  const { _id } = req.session.passport!.user;
  const itemList = { ...defaultItemList, ...req.body.itemList };

  if (!itemList || (itemList as TypeItemList).name === undefined) {
    resError(res, { type: 'itemList', message: 'Invalid item list.' });
    return;
  }

  const user = await User.findById(_id);
  if (!user) {
    resError(res, { type: 'user', message: 'User does not exist.' });
    return;
  }

  const newItemList = await ItemList.create(itemList);
  user.lists.push(newItemList._id);
  await user.save();

  res.status(200).json({
    success: true,
  });
};

/**
 * Updates a user's item list
 * @route PUT /items/lists
 * @param {TypeItemList} req.body.itemList - item list to update
 * @returns {Object} 200 - success message
 * @returns {Error}  400 - Invalid username
 * @returns {Error}  400 - Invalid item list
 */
export const updateItemList: RequestHandler = async (req, res) => {
  const { _id } = req.session.passport!.user;
  const { itemList } = req.body;

  if (!itemList || (itemList as TypeItemList)._id === undefined) {
    resError(res, { type: 'itemList', message: 'Invalid item list.' });
    return;
  }

  const user = await User.findById(_id);
  if (!user) {
    resError(res, { type: 'user', message: 'User does not exist.' });
    return;
  }
  if (!user.lists.includes(itemList._id)) {
    resError(res, { type: 'itemList', message: 'Item list does not exist.' });
    return;
  }

  await ItemList.findByIdAndUpdate(itemList._id, itemList);

  res.status(200).json({
    success: true,
  });
};

/**
 * Deletes an item list from a user
 * @route DELETE /items/lists
 * @param {string} req.params.itemListId - id of item list to delete
 * @returns {Object} 200 - success message
 * @returns {Error}  400 - Invalid username
 * @returns {Error}  400 - Invalid item list id
 */
export const deleteItemList: RequestHandler = async (req, res) => {
  const { _id } = req.session.passport!.user;
  const { itemListId } = req.query;

  if (!itemListId || typeof itemListId !== 'string') {
    resError(res, { type: 'itemListId', message: 'Invalid item list id.' });
    return;
  }

  const user = await User.findById(_id);
  if (!user) {
    resError(res, { type: 'user', message: 'User does not exist.' });
    return;
  }
  if (!user.lists.includes(itemListId as any)) {
    resError(res, { type: 'itemList', message: 'Item list does not exist.' });
    return;
  }
  user.lists = user.lists.filter((id) => id.toString() !== itemListId);
  await user.save();

  const itemList = await ItemList.findById(itemListId);
  if (itemList) {
    itemList.items.forEach(async (itemId: ObjectId) => {
      await Item.findByIdAndDelete(itemId);
    });
    await itemList.remove();
  }

  res.status(200).json({
    success: true,
  });
};
