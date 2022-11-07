import React, { useState } from 'react';

import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import type { TypeDBItemList } from '../types/item';

import ItemListModal from './ItemListModal';

import '../styles/components/itemlistmeta.css';

function ItemListMeta({ itemList }: { itemList: TypeDBItemList }) {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <div>
      <Card className="item-list-border item-list-meta item-card">
        <CardContent className="item-content">
          <Typography variant="h4">{itemList.name}</Typography>
        </CardContent>

        <CardActions className="fill-width item-actions">
          <IconButton onClick={() => setEditOpen(true)}>
            <EditIcon />
          </IconButton>
        </CardActions>
      </Card>

      <ItemListModal open={editOpen} close={() => setEditOpen(false)} itemList={itemList} />
    </div>
  );
}

export default ItemListMeta;
