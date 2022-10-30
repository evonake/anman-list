import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store';
import type TypeSelf from '../../types/self';

const initialState: TypeSelf = {
  isLoggedIn: false,
  username: '',
};

export const selfSlice = createSlice({
  name: 'self',
  initialState,
  reducers: {
    set(state, action: PayloadAction<TypeSelf>) {
      return action.payload;
    },
  },
});

export const selectIsLoggedIn = (state: RootState) => state.self.isLoggedIn;
export const selectUsername = (state: RootState) => state.self.username;

export default selfSlice.reducer;
