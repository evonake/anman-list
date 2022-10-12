import type { PayloadAction } from '@reduxjs/toolkit';
import type { AppDispatch as A, RootState as R } from '../../store';

type Store = {
  dispatch: A;
  getState: () => R;
};

type Handler = ({ dispatch, getState }: Store, action: PayloadAction<any>) => Promise<void>;

export default Handler;
