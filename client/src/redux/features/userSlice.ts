import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import type { RootState } from '../store';
import type TypeError from '../../types/error';
import type { ReduxSliceBase, MyCreateAsyncThunkOptions } from '../../types/redux';

import type { UserLoginPayload, UserRegisterPayload } from '../../api/types';
import {
  handleUserLogin,
  handleUserRegister,
  handleUserLogout,
  handleUserAuth,
} from '../../api/handlers/userHandlers';

type ReduxTypeUser = ReduxSliceBase & {
  isLoggedIn: boolean;
  username: string;
};

const initialError: TypeError = {
  type: '',
  message: '',
};
const initialState: ReduxTypeUser = {
  isLoggedIn: false,
  username: '',
  error: initialError,
  reqStatus: 'idle',
};

export const loginThunk = createAsyncThunk<any, UserLoginPayload, MyCreateAsyncThunkOptions>(
  'user/login',
  async (payload: UserLoginPayload, { rejectWithValue }) => {
    const data = await handleUserLogin(payload);

    if (!data.success) {
      return rejectWithValue({ error: data.error });
    }
    return data;
  },
);

export const registerThunk = createAsyncThunk<any, UserRegisterPayload, MyCreateAsyncThunkOptions>(
  'user/register',
  async (payload: UserRegisterPayload, { rejectWithValue }) => {
    const data = await handleUserRegister(payload);

    if (!data.success) {
      return rejectWithValue({ error: data.error });
    }
    return loginThunk(payload);
  },
);

export const logoutThunk = createAsyncThunk<any, void, MyCreateAsyncThunkOptions>(
  'user/logout',
  async (_, { rejectWithValue }) => {
    const data = await handleUserLogout();

    if (!data.success) {
      return rejectWithValue({ error: data.error });
    }
    return data;
  },
);

export const authThunk = createAsyncThunk<any, void, MyCreateAsyncThunkOptions>(
  'user/auth',
  async (_, { rejectWithValue }) => {
    const data = await handleUserAuth();

    if (!data.success) {
      return rejectWithValue({ error: data.error });
    }
    return data;
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.username = action.payload.username;
        state.error = initialError;
        state.reqStatus = 'fulfilled';
      })
      .addCase(loginThunk.pending, (state) => {
        state.reqStatus = 'pending';
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.error = action.payload?.error || initialError;
        state.reqStatus = 'rejected';
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.username = action.payload.username;
        state.error = initialError;
        state.reqStatus = 'fulfilled';
      })
      .addCase(registerThunk.pending, (state) => {
        state.reqStatus = 'pending';
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.error = action.payload?.error || initialError;
        state.reqStatus = 'rejected';
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.username = '';
        state.error = initialError;
        state.reqStatus = 'fulfilled';
      })
      .addCase(logoutThunk.pending, (state) => {
        state.reqStatus = 'pending';
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.error = action.payload?.error || initialError;
        state.reqStatus = 'rejected';
      })
      .addCase(authThunk.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.username = action.payload.username;
        state.error = initialError;
        state.reqStatus = 'fulfilled';
      })
      .addCase(authThunk.pending, (state) => {
        state.reqStatus = 'pending';
      })
      .addCase(authThunk.rejected, (state, action) => {
        state.error = action.payload?.error || initialError;
        state.reqStatus = 'rejected';
      });
  },
});

export const selectIsLoggedIn = (state: RootState) => state.user.isLoggedIn;
export const selectUsername = (state: RootState) => state.user.username;
export const selectUserError = (state: RootState) => state.user.error;
export const selectUserReqStatus = (state: RootState) => state.user.reqStatus;

export default userSlice.reducer;
