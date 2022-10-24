/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';

import {
  Button,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Modal,
  ToggleButtonGroup,
  ToggleButton,
  IconButton,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';

import { useAppDispatch } from '../redux/hooks';
import { itemAdd, itemDelete, itemUpdate } from '../redux/constants/actionCreators/itemActions';

import type TypeItem from '../types/item';

import AddItemInput from './AddItemInput';
import useInputWithErrors from '../hooks/inputWithErrors';

import '../styles/components/itemmodal.css';

type Input = Omit<TypeItem, 'trackers' | 'status'>;
type Props = {
  add?: boolean;
  open: boolean;
  close: () => void;
  item: TypeItem;
} & typeof defaultProps;
const defaultProps = {
  add: false,
};
function ItemModal({
  add = false,
  open,
  close,
  item,
}: Props) {
  const dispatch = useAppDispatch();

  const [confirmDelete, setConfirmDelete] = useState(false);

  const {
    inputs,
    handleInputChange,
    errors,
    validate,
    reset: resetInputs,
  } = useInputWithErrors<Input>({ title: item.title, link: item.link }, ['link']);

  const [status, setStatus] = useState<TypeItem['status']>(item.status);

  const [trackersInput, setTrackersInput] = useState<TypeItem['trackers']>(item.trackers);

  const initialTrackersErrors = trackersInput.map(() => ({ name: false, value: false }));
  const [trackersErrors, setTrackersErrors] = useState<{ name: boolean, value: boolean }[]>(
    initialTrackersErrors,
  );

  const handleChangeStatus = (event: React.MouseEvent<HTMLElement>, newStatus: TypeItem['status']) => {
    if (newStatus) {
      setStatus(newStatus);
    }
  };

  const handleChangeTracker = (i: number, t: 'name' | 'value') => (e: React.ChangeEvent<HTMLInputElement>) => {
    // i: index of tracker in trackersInput
    e.preventDefault();

    // eslint-disable-next-line no-restricted-globals
    if (t === 'value' && isNaN(Number(e.target.value))) {
      return;
    }

    const newTracker = { ...trackersInput[i], [t]: e.target.value };
    const newTrackersNames = trackersInput.map((tracker, j) => (i === j ? newTracker : tracker));

    setTrackersInput(newTrackersNames);

    const newTrackerErrors = trackersErrors.map((error, j) => (i === j ? { ...error, [t]: '' } : error));
    setTrackersErrors(newTrackerErrors);
  };

  const handleAddTracker = () => {
    setTrackersInput([...trackersInput, { name: '', value: 0 }]);
    setTrackersErrors([...trackersErrors, { name: false, value: false }]);
  };

  const handleRemoveTracker = (i: number) => () => {
    setTrackersInput(trackersInput.filter((_, j) => i !== j));
    setTrackersErrors(trackersErrors.filter((_, j) => i !== j));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    let valid = validate();
    const newTrackersErrors = [...trackersErrors];

    trackersInput.forEach((tracker, i) => {
      if (!tracker.name) {
        newTrackersErrors[i].name = true;
        valid = false;
      }
      if (!tracker.value && tracker.value !== 0) {
        newTrackersErrors[i].value = true;
        valid = false;
      }
    });

    if (valid) {
      const newItem = {
        ...item,
        ...inputs,
        status,
        trackers: trackersInput,
      };

      if (add) {
        dispatch(itemAdd(newItem));
      } else {
        dispatch(itemUpdate(newItem));
      }
      resetAndClose();
    } else {
      setTrackersErrors(newTrackersErrors);
    }
  };

  const handleDelete = () => {
    dispatch(itemDelete(item._id!));
    resetAndClose();
  };

  const resetAndClose = () => {
    close();
    resetInputs();
    setStatus('ongoing');
    setConfirmDelete(false);
    setTrackersInput(item.trackers);
    setTrackersErrors(initialTrackersErrors);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={close}
      >
        <Card className={`item-modal item-card ${status}`}>
          <CardHeader className="item-header" title={`${add ? 'Add' : 'Edit'} Item`} />
          <CardContent className="item-modal-content">
            <Stack className="fill" justifyContent="space-between">
              <AddItemInput
                required
                className="fill-width"
                label="Title"
                error={errors.title}
                onChange={handleInputChange('title')}
              >
                {inputs.title}
              </AddItemInput>

              <Stack direction="row" spacing={2}>
                <AddItemInput
                  className="fill-width"
                  label="Link"
                  error={errors.link}
                  onChange={handleInputChange('link')}
                >
                  {inputs.link}
                </AddItemInput>

                <Divider orientation="vertical" flexItem />

                <ToggleButtonGroup
                  exclusive
                  size="small"
                  value={status}
                  onChange={handleChangeStatus}
                >
                  <ToggleButton value="ongoing">Ongoing</ToggleButton>
                  <ToggleButton value="completed">Completed</ToggleButton>
                  <ToggleButton value="dropped">Dropped</ToggleButton>
                </ToggleButtonGroup>
              </Stack>

              <TrackersList
                trackers={trackersInput}
                errors={trackersErrors}
                onChange={handleChangeTracker}
                onRemove={handleRemoveTracker}
                onAdd={handleAddTracker}
              />
            </Stack>
          </CardContent>

          <CardActions className="item-actions">
            <Stack className="fill-width" direction="row" justifyContent="flex-end" spacing={1}>
              {!add && (
                <IconButton color="error" onClick={() => setConfirmDelete(true)}>
                  <DeleteIcon />
                </IconButton>
              )}
              <Button variant="outlined" onClick={resetAndClose} startIcon={<CloseIcon />}>
                Cancel
              </Button>
              {add ? (
                <Button variant="contained" onClick={handleSubmit} startIcon={<AddIcon />}>
                  Add
                </Button>
              ) : (
                <Button variant="contained" onClick={handleSubmit} startIcon={<CheckIcon />}>
                  Confirm
                </Button>
              )}
            </Stack>
          </CardActions>
          <Modal
            open={confirmDelete}
            onClose={() => setConfirmDelete(false)}
          >
            <Card className="confirm-delete-modal item-card">
              <CardHeader title="Are you sure you want to delete this item?" />
              <CardActions className="item-actions">
                <Stack className="fill-width" direction="row" justifyContent="flex-end" spacing={1}>
                  <Button variant="outlined" onClick={() => setConfirmDelete(false)} startIcon={<CloseIcon />}>
                    Cancel
                  </Button>
                  <Button variant="contained" color="error" onClick={handleDelete} startIcon={<DeleteIcon />}>
                    Delete
                  </Button>
                </Stack>
              </CardActions>
            </Card>
          </Modal>
        </Card>

      </Modal>
    </div>
  );
}
ItemModal.defaultProps = defaultProps;

type TrackersListProps = {
  trackers: TypeItem['trackers'];
  errors: { name: boolean, value: boolean }[];
  onChange: (i: number, t: 'name' | 'value') => (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (i: number) => () => void;
  onAdd: () => void;
};
function TrackersList({
  trackers,
  errors,
  onChange,
  onRemove,
  onAdd,
}: TrackersListProps) {
  return (
    <Stack className="tracker-list" direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
      <Typography variant="h6">Trackers: </Typography>
      {trackers.map((tracker, i) => (
        <Stack className="tracker" direction="row" spacing={2}>
          <AddItemInput
            required
            key={`trackerName${i}`}
            className="name"
            label="Name"
            error={errors[i].name ? ' ' : ''}
            onChange={onChange(i, 'name')}
          >
            {tracker.name}
          </AddItemInput>
          <AddItemInput
            required
            key={`trackerValue${i}`}
            className="value"
            label="Value"
            error={errors[i].value ? ' ' : ''}
            onChange={onChange(i, 'value')}
          >
            {tracker.value}
          </AddItemInput>
          {trackers.length > 1 && (
            <IconButton onClick={onRemove(i)} style={{ height: 'max-content' }}>
              <CloseIcon />
            </IconButton>
          )}
        </Stack>
      ))}
      <IconButton onClick={onAdd} style={{ height: 'max-content' }}>
        <AddIcon />
      </IconButton>
    </Stack>
  );
}

export default ItemModal;
