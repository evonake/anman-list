import type { PayloadAction } from '@reduxjs/toolkit';
import type { AppDispatch as A } from '../../store';

type Handler = (dispatch: A, action: PayloadAction<any>) => Promise<void>;

export default Handler;
