/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';

import {
  Button,
  Card,
  Modal,
  ToggleButtonGroup,
  ToggleButton,
  TextField,
  IconButton,
  Divider,
  Stack,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

import { useAppDispatch } from '../redux/hooks';
import { itemAdd } from '../redux/constants/actionCreators/itemActions';

import type TypeItem from '../types/item';

import AddItemInput from './AddItemInput';
import useInputWithErrors from '../hooks/inputWithErrors';

import '../styles/components/itemmodal.css';

type Input = Omit<TypeItem, 'trackers' | 'status'>;
type Props = {
  resetOnSubmit?: boolean;
  open: boolean;
  close: () => void;
  item: TypeItem;
} & typeof defaultProps;
const defaultProps = {
  resetOnSubmit: false,
};
function ItemModal({
  resetOnSubmit = false,
  open,
  close,
  item,
}: Props) {
  const dispatch = useAppDispatch();

  const {
    inputs,
    handleInputChange,
    errors,
    validate,
    reset: resetInputs,
  } = useInputWithErrors<Input>({ title: item.title, link: item.link }, ['link']);

  const [status, setStatus] = useState<TypeItem['status']>(item.status);

  const [trackersInput, setTrackersInput] = useState<TypeItem['trackers']>(item.trackers);

  const initialTrackersErrors = trackersInput.map(() => ({ name: '', value: '' }));
  const [trackersErrors, setTrackersErrors] = useState<{ name: string, value: string }[]>(
    initialTrackersErrors,
  );

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
    setTrackersInput([...trackersInput, { name: 'Page', value: 0 }]);
    setTrackersErrors([...trackersErrors, { name: '', value: '' }]);
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
        newTrackersErrors[i].name = 'Tracker name cannot be empty';
        valid = false;
      }
      if (!tracker.value && tracker.value !== 0) {
        newTrackersErrors[i].value = 'Must be a number';
        valid = false;
      }
    });

    if (valid) {
      const newItem = {
        ...inputs,
        status,
        trackers: trackersInput,
      };

      dispatch(itemAdd(newItem));
      close();

      if (resetOnSubmit) {
        resetInputs();
        setStatus('ongoing');
        setTrackersInput(item.trackers);
        setTrackersErrors(initialTrackersErrors);
      }
    } else {
      setTrackersErrors(newTrackersErrors);
    }
  };

  // TODO: EditItem.tsx should not have a FAB, only AddItem.tsx
  //       how to connect EditItem.state.open to each Item.tsx?
  //           & make it so that only one Item.tsx can be open at a time

  return (
    <div>
      <Modal
        open={open}
        onClose={close}
      >
        <Card className="item-modal item item-card">
          <AddItemInput
            label="Title"
            error={errors.title}
            onChange={handleInputChange('title')}
          >
            {inputs.title}
          </AddItemInput>
          <AddItemInput
            label="Link"
            error={errors.link}
            onChange={handleInputChange('link')}
          >
            {inputs.link}
          </AddItemInput>
          <StatusChooser
            value={status}
            onChange={setStatus}
          />
          <TrackersList
            trackers={trackersInput}
            errors={trackersErrors}
            onChange={handleChangeTracker}
            onRemove={handleRemoveTracker}
          />
          <IconButton onClick={handleAddTracker}>
            <AddIcon />
          </IconButton>
          <Button onClick={handleSubmit}>
            Add
          </Button>
        </Card>
      </Modal>
    </div>
  );
}
ItemModal.defaultProps = defaultProps;

type StatusProps = {
  value: TypeItem['status'];
  onChange: React.Dispatch<React.SetStateAction<TypeItem['status']>>;
};
function StatusChooser({ value, onChange }: StatusProps) {
  return (
    <ToggleButtonGroup
      exclusive
      value={value}
      onChange={(e, s) => onChange(s)}
    >
      <ToggleButton value="ongoing">Ongoing</ToggleButton>
      <ToggleButton value="completed">Completed</ToggleButton>
      <ToggleButton value="dropped">Dropped</ToggleButton>
    </ToggleButtonGroup>
  );
}

type TrackersListProps = {
  trackers: TypeItem['trackers'];
  errors: { name: string, value: string }[];
  onChange: (i: number, t: 'name' | 'value') => (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (i: number) => () => void;
};
function TrackersList({
  trackers,
  errors,
  onChange,
  onRemove,
}: TrackersListProps) {
  return (
    <Stack direction="row" spacing={2}>
      {trackers.map((tracker, i) => (
        <Stack className="tracker" direction="row" spacing={2}>
          <TextField
            key={`trackerName${i}`}
            className="name"
            variant="standard"
            type="text"
            error={!!(errors[i].name)}
            value={tracker.name}
            helperText={errors[i].name || ' '}
            onChange={onChange(i, 'name')}
          />
          <TextField
            key={`trackerValue${i}`}
            className="value"
            variant="standard"
            type="text"
            error={!!errors[i].value}
            value={tracker.value}
            helperText={errors[i].value || ' '}
            onChange={onChange(i, 'value')}
          />
          {trackers.length > 1 && (
            <IconButton onClick={onRemove(i)} style={{ borderRadius: 4 }}>
              <CloseIcon />
            </IconButton>
          )}
          {i !== trackers.length - 1 && <Divider orientation="vertical" />}
        </Stack>
      ))}
    </Stack>
  );
}

export default ItemModal;
