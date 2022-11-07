/* eslint-disable @typescript-eslint/return-await */
import ax from '../axios';

import type { TypeDBItemList, TypeItemList } from '../../types/item';
import { handleItemGet } from './itemHandlers';

const axios = ax.create({
  baseURL: 'items/lists',
});

// get itemList on item add/update/delete
// get items on initial login
export const handleItemListGet = async (itemListId: string) => {
  const res = await axios.get('', { params: { itemListId } });

  return res.data;
};

export const handleItemListAdd = async (itemList: TypeItemList) => {
  const res = await axios.post('/', { itemList });

  if (!res.data.success) {
    return res.data;
  }

  return await handleItemGet();
};

export const handleItemListUpdate = async (itemList: TypeDBItemList) => {
  const res = await axios.put('/', { itemList });

  if (!res.data.success) {
    return res.data;
  }

  return await handleItemListGet(itemList._id);
};

export const handleItemListDelete = async (id: string) => {
  const res = await axios.delete('/', { params: { itemListId: id } });

  if (!res.data.success) {
    return res.data;
  }

  return await handleItemGet();
};
