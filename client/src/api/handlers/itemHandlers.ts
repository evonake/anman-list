import ax from '../axios';
import type { TypeItem, TypeDBItem } from '../../types/item';

const axios = ax.create({
  baseURL: 'items/',
});

export const handleItemGet = async () => {
  const res = await axios.get('/');

  return res.data;
};

export const handleItemAdd = async (item : TypeItem) => {
  const res = await axios.post('/', { item });

  return res.data;
};

export const handleItemUpdate = async (item : TypeDBItem) => {
  const res = await axios.put('/', { item });

  return res.data;
};

export const handleItemDelete = async (id : string) => {
  const res = await axios.delete('/', { params: { itemId: id } });

  return res.data;
};
