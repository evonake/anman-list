/* eslint-disable @typescript-eslint/return-await */
import ax from '../axios';

import type { TypeItem, TypeDBItem } from '../../types/item';
import { handleItemListGet } from './itemListHandlers';

const axios = ax.create({
  baseURL: '/items',
});

export const handleItemGet = async () => {
  const res = await axios.get('/');

  return res.data;
};

export const handleItemAdd = async (item : TypeItem) => {
  const res = await axios.post('/', { item });

  if (!res.data.success) {
    return res.data;
  }

  return await handleItemListGet(item.listId);
};

export const handleItemUpdate = async (item : TypeDBItem) => {
  const res = await axios.put('/', { item });

  if (!res.data.success) {
    return res.data;
  }
  return await handleItemListGet(item.listId);
};

export const handleItemDelete = async (itemId : string, listId: string) => {
  const res = await axios.delete('/', { params: { itemId } });

  if (!res.data.success) {
    return res.data;
  }
  return await handleItemListGet(listId);
};
