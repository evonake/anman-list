import React, { useState } from 'react';

import {
  Card,
  CardContent,
  CardActions,
  Stack,
  IconButton,
  Typography,
  Divider,
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EditIcon from '@mui/icons-material/Edit';

import type TypeItem from '../types/item';

import ItemModal from './ItemModal';

import '../styles/components/item.css';

type Props = {
  itemData: TypeItem;
};
function Item({ itemData }: Props) {
  const [editOpen, setEditOpen] = useState(false);

  const {
    title,
    link,
    trackers,
    status,
  } = itemData;

  return (
    <div>
      <Card className={`item item-card ${status}`} variant="outlined">
        <CardContent className="item-content">
          <Stack className="fill" justifyContent="space-between">
            <Typography variant="h4" noWrap>{title}</Typography>
            <Typography variant="body2" noWrap>{link}</Typography>
            <Stack className="tracker-list" direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
              {trackers.map((tracker) => (
                <Stack direction="row" alignItems="center" key={tracker.name}>
                  <p>{`${tracker.name}: `}</p>
                  <TrackerWithArrows value={tracker.value} />
                </Stack>
              ))}
            </Stack>
          </Stack>
        </CardContent>

        <CardActions className="item-actions">
          <Stack className="fill-width" direction="row" justifyContent="flex-end" spacing={1}>
            <IconButton onClick={() => setEditOpen(true)}>
              <EditIcon />
            </IconButton>
          </Stack>
        </CardActions>
      </Card>

      <ItemModal open={editOpen} close={() => setEditOpen(false)} item={itemData} />
    </div>
  );
}

function TrackerWithArrows({ value }: { value: number }) {
  return (
    <Stack>
      <IconButton size="small" onClick={() => console.log('up')}>
        <KeyboardArrowUpIcon />
      </IconButton>
      <Typography align="center">{value}</Typography>
      <IconButton size="small" onClick={() => console.log('down')}>
        <KeyboardArrowDownIcon />
      </IconButton>
    </Stack>
  );
}

export default Item;
