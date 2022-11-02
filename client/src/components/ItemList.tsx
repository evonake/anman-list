import React from 'react';

import { Stack } from '@mui/material';

import Item from './Item';
import { TypeDBItemList } from '../types/item';

type Props = {
  itemList: TypeDBItemList
};
function ItemList({ itemList }: Props) {
  return (
    // TODO: place to configure itemList settings (name, trackerNames)
    <Stack spacing={2}>
      {itemList.items.map((item) => (
        <Item item={item} key={item._id} />
      ))}
    </Stack>
  );
}

export default ItemList;
