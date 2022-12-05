import TypeError from './error';

export type ReduxSliceBase = {
  error: TypeError,
  reqStatus: 'idle' | 'pending' | 'fulfilled' | 'rejected',
};

export type MyCreateAsyncThunkOptions = {
  rejectValue: {
    error: TypeError,
  },
};
