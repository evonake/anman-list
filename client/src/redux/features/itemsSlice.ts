import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store';
import type { TypeDBItem } from '../../types/item';

const initialState: TypeDBItem[] = [];

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    set(state, action: PayloadAction<TypeDBItem[]>) {
      return action.payload;
    },
  },
});

export const selectItem = (state: RootState) => state.items;

export default itemsSlice.reducer;
