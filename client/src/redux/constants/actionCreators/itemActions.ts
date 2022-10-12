import type TypeItem from '../../../types/item';
import {
  ITEM_GET,
  ITEM_ADD,
  ITEM_DELETE,
  ITEM_UPDATE,
  ITEMS_SET,
} from '../actionNames/itemEvents';

export const itemGet = () => ({
  type: ITEM_GET,
});

export const itemAdd = (item: TypeItem) => ({
  type: ITEM_ADD,
  payload: {
    item,
  },
});

export const itemDelete = (itemId: string) => ({
  type: ITEM_DELETE,
  payload: {
    itemId,
  },
});

export const itemUpdate = (item: TypeItem) => ({
  type: ITEM_UPDATE,
  payload: {
    item,
  },
});

export const itemsSet = (items: TypeItem[]) => ({
  type: ITEMS_SET,
  payload: items,
});
