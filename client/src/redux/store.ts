import { combineReducers, configureStore } from '@reduxjs/toolkit';

import userReducer from './features/userSlice';
import itemListsReducer from './features/itemsListSlice';
import errorReducer from './features/errorSlice';

const rootReducer = combineReducers({
  user: userReducer,
  itemLists: itemListsReducer,
  error: errorReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
