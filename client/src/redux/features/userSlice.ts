import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store';
import type TypeUser from '../../types/user';

const initialState: TypeUser = {
  username: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    set(state, action: PayloadAction<TypeUser>) {
      return action.payload;
    },
  },
});

export const selectUsername = (state: RootState) => state.user.username;

export default userSlice.reducer;
