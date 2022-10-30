import { combineReducers, configureStore } from '@reduxjs/toolkit';

import axiosMiddleware from './middleware/axios';

import userReducer from './features/userSlice';
import itemsReducer from './features/itemsSlice';
import errorReducer from './features/errorSlice';

const rootReducer = combineReducers({
  user: userReducer,
  items: itemsReducer,
  error: errorReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(axiosMiddleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
