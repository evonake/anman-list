import React from 'react';

import { Stack } from '@mui/material';

import Item from './Item';
import ItemListMeta from './ItemListMeta';
import { TypeDBItemList } from '../types/item';

import '../styles/components/itemlist.css';

type Props = {
  itemList: TypeDBItemList
};
function ItemList({ itemList }: Props) {
  return (
    <Stack className="item-list" spacing={2}>
      <ItemListMeta itemList={itemList} />
      {itemList.items.map((item) => (
        <Item item={item} key={item._id} />
      ))}
    </Stack>
  );
}

export default ItemList;
