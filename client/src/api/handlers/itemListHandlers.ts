import ax from '../axios';
import type { TypeDBItemList, TypeItemList } from '../../types/item';

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

  return res.data;
};

export const handleItemListUpdate = async (itemList: TypeDBItemList) => {
  const res = await axios.put('/', { itemList });

  return res.data;
};

export const handleItemListDelete = async (id: string) => {
  const res = await axios.delete('/', { params: { listId: id } });

  return res.data;
};
