import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store';
import type TypeError from '../../types/error';

const initialState: TypeError = {
  type: '',
  message: '',
};

export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    set(state, action: PayloadAction<TypeError>) {
      return action.payload;
    },
    reset: () => initialState,
  },
});

export const selectError = (state: RootState) => state.error;

export default errorSlice.reducer;
