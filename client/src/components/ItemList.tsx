import React from 'react';

import { Stack } from '@mui/material';

import { useAppSelector } from '../redux/hooks';
import { selectItem } from '../redux/features/itemsSlice';

import Item from './Item';

function ItemList() {
  const items = useAppSelector(selectItem);

  return (
    <Stack spacing={2}>
      {items.map((item) => (
        <Item item={item} key={item._id} />
      ))}
    </Stack>
  );
}

export default ItemList;
