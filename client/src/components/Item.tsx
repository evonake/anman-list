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
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import type { TypeDBItem } from '../types/item';

import { useAppDispatch } from '../redux/hooks';
import { itemUpdateThunk } from '../redux/features/itemListsSlice';

import ItemModal from './ItemModal';

import '../styles/components/item.css';

type Props = {
  item: TypeDBItem;
};
function Item({ item }: Props) {
  const dispatch = useAppDispatch();

  const [editOpen, setEditOpen] = useState(false);

  // by comparing with JSON.stringify(), we can check if the item has changed
  const [edited, setEdited] = useState(false);

  const {
    title,
    link,
    status,
  } = item;
  const originalTrackers = item.trackers;

  const [trackers, setTrackers] = useState<TypeDBItem['trackers']>(originalTrackers);

  const handleTrackerChange = (i: number) => (value: number) => {
    // i: index of tracker
    const newTracker = { ...trackers[i], value };
    const newTrackers = trackers.map((t, j) => (i === j ? newTracker : t));

    setTrackers(newTrackers);

    setEdited(JSON.stringify(newTrackers) !== JSON.stringify(originalTrackers));
  };

  const openEditModal = () => {
    handleCancelEdit();
    setEditOpen(true);
  };

  const handleEditItem = () => {
    const newItem = {
      ...item,
      trackers,
    };

    dispatch(itemUpdateThunk(newItem));
    setEdited(false);
  };

  const handleCancelEdit = () => {
    setTrackers(originalTrackers);
    setEdited(false);
  };

  return (
    <div>
      <Card className={`item item-card ${status}`} variant="outlined">
        <CardContent className="item-content">
          <Stack className="fill" justifyContent="space-between">
            <Typography variant="h4" noWrap>{title}</Typography>
            <Typography variant="body2" noWrap>{link}</Typography>
            <Stack className="tracker-list" direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
              {trackers.map((tracker, i) => (
                <Stack direction="row" alignItems="center" key={tracker.name}>
                  <p>{`${tracker.name}: `}</p>
                  <TrackerWithArrows value={tracker.value} onChange={handleTrackerChange(i)} />
                </Stack>
              ))}
            </Stack>
          </Stack>
        </CardContent>

        <CardActions className="fill-width item-actions">
          <Stack className="fill-width" direction="row" justifyContent="space-between">
            <IconButton onClick={openEditModal}>
              <EditIcon />
            </IconButton>
            {edited && (
            <Stack direction="row" spacing={1}>
              <IconButton onClick={handleCancelEdit}>
                <CloseIcon />
              </IconButton>
              <IconButton onClick={handleEditItem}>
                <CheckIcon />
              </IconButton>
            </Stack>
            )}
          </Stack>
        </CardActions>
      </Card>

      <ItemModal open={editOpen} close={() => setEditOpen(false)} item={item} />
    </div>
  );
}

type TrackerWithArrowsProps = {
  value: number;
  onChange: (value: number) => void;
};
function TrackerWithArrows({ value, onChange }: TrackerWithArrowsProps) {
  return (
    <Stack>
      <IconButton size="small" onClick={() => onChange(value + 1)}>
        <KeyboardArrowUpIcon />
      </IconButton>
      <Typography align="center">{value}</Typography>
      <IconButton size="small" onClick={() => onChange(value - 1)}>
        <KeyboardArrowDownIcon />
      </IconButton>
    </Stack>
  );
}

export default Item;
