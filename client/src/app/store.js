import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
// import dataReducer from '../features/dataSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    // data: dataReducer,
  },
});
