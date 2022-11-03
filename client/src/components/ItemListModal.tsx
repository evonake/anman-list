/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';

import {
  Button,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Modal,
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
import {
  itemListAddThunk,
  itemListUpdateThunk,
  itemListDeleteThunk,
  selectItemsListsError,
} from '../redux/features/itemListsSlice';

import type { TypeItemList, TypeDBItemList } from '../types/item';

import AddItemInput from './AddItemInput';
import useInputWithErrors from '../hooks/inputWithErrors';

import '../styles/components/itemlistmodal.css';

type Input = Omit<TypeItemList, 'trackerNames'>;
type Props = {
  add?: boolean;
  open: boolean;
  close: () => void;
  itemList: TypeItemList | TypeDBItemList;
} & typeof defaultProps;
const defaultProps = {
  add: false,
};
function ItemModal({
  add,
  open,
  close,
  itemList,
}: Props) {
  const dispatch = useAppDispatch();

  const [confirmDelete, setConfirmDelete] = useState(false);

  const {
    inputs,
    handleInputChange,
    errors,
    validate,
    reset: resetInputs,
  } = useInputWithErrors<Input>({ name: itemList.name }, selectItemsListsError);

  const [trackerNamesInputs, setTrackerNamesInputs] = useState<TypeItemList['trackerNames']>(itemList.trackerNames);

  const initialErrors = trackerNamesInputs.map(() => false);
  const [trackerNamesErrors, setTrackerNamesErrors] = useState<boolean[]>(initialErrors);

  const handleChangeTracker = (i: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrackerNamesInputs(trackerNamesInputs.map((n, j) => (i === j ? e.target.value : n)));

    setTrackerNamesErrors(trackerNamesInputs.map(() => false));
  };

  const handleAddTracker = () => {
    setTrackerNamesInputs([...trackerNamesInputs, '']);
    setTrackerNamesErrors([...trackerNamesErrors, false]);
  };

  const handleRemoveTracker = (i: number) => () => {
    setTrackerNamesInputs(trackerNamesInputs.filter((_, j) => i !== j));
    setTrackerNamesErrors(trackerNamesErrors.filter((_, j) => i !== j));
  };

  const handleSubmit = () => {
    let valid = validate();
    const newTrackerNamesErrors = [...trackerNamesErrors];

    trackerNamesInputs.forEach((name, i) => {
      if (!name) {
        newTrackerNamesErrors[i] = true;
        valid = false;
      }
    });

    if (valid) {
      const newItemList = {
        ...itemList,
        ...inputs,
        trackerNames: trackerNamesInputs,
      };

      if (add) {
        dispatch(itemListAddThunk(newItemList));
        resetAndClose();
      } else {
        dispatch(itemListUpdateThunk(newItemList as TypeDBItemList));
        close();
      }
    } else {
      setTrackerNamesErrors(newTrackerNamesErrors);
    }
  };

  const handleDelete = () => {
    dispatch(itemListDeleteThunk((itemList as TypeDBItemList)._id));
    close();
  };

  const resetAndClose = () => {
    close();
    resetInputs();
    setConfirmDelete(false);
    setTrackerNamesInputs(itemList.trackerNames);
    setTrackerNamesErrors(initialErrors);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={close}
      >
        <Card className="item-list-modal item-card">
          <CardHeader className="item-header" title={`${add ? 'Add' : 'Edit'} Item List`} />
          <CardContent className="item-list-modal-content">
            <Stack className="fill" justifyContent="space-between">
              <AddItemInput
                required
                className="fill-width"
                label="Name"
                error={errors.name}
                onChange={handleInputChange('name')}
              >
                {inputs.name}
              </AddItemInput>

              <TrackerNamesList
                trackerNames={trackerNamesInputs}
                errors={trackerNamesErrors}
                onChange={handleChangeTracker}
                onRemove={handleRemoveTracker}
                onAdd={handleAddTracker}
              />
            </Stack>
          </CardContent>

          <CardActions className="item-modal-actions">
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
              <CardActions className="item-modal-actions">
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

type TrackerNamesListProps = {
  trackerNames: TypeItemList['trackerNames'];
  errors: boolean[];
  onChange: (i: number, t: 'name' | 'value') => (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (i: number) => () => void;
  onAdd: () => void;
};
function TrackerNamesList({
  trackerNames,
  errors,
  onChange,
  onRemove,
  onAdd,
}: TrackerNamesListProps) {
  return (
    <Stack className="tracker-list" direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
      <Typography variant="body2">Tracker Names: </Typography>
      {trackerNames.map((name, i) => (
        <Stack className="tracker" key={`tracker${i}`} direction="row" spacing={2}>
          <AddItemInput
            required
            className="name"
            label="Name"
            error={errors[i] ? ' ' : ''}
            onChange={onChange(i, 'name')}
          >
            {name}
          </AddItemInput>
          {trackerNames.length > 1 && (
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
