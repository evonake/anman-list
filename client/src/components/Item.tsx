import React from 'react';

import {
  Card,
  CardContent,
  Stack,
  IconButton,
  Typography,
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import type TypeItem from '../types/item';

import '../styles/components/item.css';

type Props = {
  itemData: TypeItem;
};
function Item({ itemData }: Props) {
  const {
    title,
    link,
    trackers,
    // status,
  } = itemData;

  // TODO: add status to Item card

  return (
    <div className="item">
      <Card className="item-card fill" variant="outlined">
        <CardContent className="fill">
          <Stack className="fill" direction="column" spacing={2} justifyContent="space-evenly">
            <h3>{title}</h3>
            <p>{link}</p>
            {trackers.map((tracker) => (
              <Stack direction="row" alignItems="center" key={tracker.name}>
                <p>{`${tracker.name}: `}</p>
                <TrackerWithArrows value={tracker.value} />
              </Stack>
            ))}
          </Stack>
        </CardContent>
      </Card>
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
