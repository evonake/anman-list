/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';

import Handler from './handler';

import { itemsSet } from '../../constants/actionCreators/itemActions';
import { errorSet, errorReset } from '../../constants/actionCreators/errorActions';

export const handleItemGet: Handler = async (dispatch, action) => {
  const res = await axios.get('/items');

  if (res.data.success) {
    dispatch(errorReset());
    dispatch(itemsSet(res.data.items));
  } else {
    const { type, message } = res.data;
    dispatch(errorSet({ type, message }));
  }
};

export const handleItemAdd: Handler = async (dispatch, action) => {
  const res = await axios.post('/items', { item: action.payload.item });

  if (res.data.success) {
    dispatch(errorReset());
    handleItemGet(dispatch, action);
  } else {
    const { type, message } = res.data;
    dispatch(errorSet({ type, message }));
  }
};

export const handleItemDelete: Handler = async (dispatch, action) => {
  const res = await axios.delete('/items/', { params: { itemId: action.payload.itemId } });

  if (res.data.success) {
    dispatch(errorReset());
    handleItemGet(dispatch, action);
  } else {
    const { type, message } = res.data;
    dispatch(errorSet({ type, message }));
  }
};

export const handleItemUpdate: Handler = async (dispatch, action) => {
  const res = await axios.put('/items', { item: action.payload.item });

  if (res.data.success) {
    dispatch(errorReset());
    handleItemGet(dispatch, action);
  } else {
    const { type, message } = res.data;
    dispatch(errorSet({ type, message }));
  }
};
