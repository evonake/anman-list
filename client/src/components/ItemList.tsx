import React from 'react';

import { Stack } from '@mui/material';

import { useAppSelector } from '../redux/hooks';
import { selectItem } from '../redux/features/itemsSlice';

import Item from './Item';

function ItemList() {
  const items = useAppSelector(selectItem);

  return (
    <Stack>
      {items.map((item) => (
        <Item itemData={item} key={item._id} />
      ))}
    </Stack>
  );
}

export default ItemList;
