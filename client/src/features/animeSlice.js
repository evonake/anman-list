import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getAnimes, updateAnime as updateAnimeAPI } from '../api/anime';

const initialState = {
  ongoing: [],
  completed: [],
  dropped: [],
  status: 'idle',
  error: null,
};

export const fetchAnime = createAsyncThunk('anime/fetchOngoing', async (status) => {
  const res = await getAnimes({ status });
  return {
    status,
    data: res,
  };
});

export const updateAnime = createAsyncThunk('anime/update', async (newAnime) => {
  await updateAnimeAPI(newAnime);
  await fetchAnime(newAnime.status);
});

export const animeDataSlice = createSlice({
  name: 'animeData',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAnime.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchAnime.fulfuilled, (state, { payload: { status, data } }) => {
        state.status = 'success';
        state[status] = state[status].concat(data);
      });
  },
});

export default animeDataSlice.reducer;
