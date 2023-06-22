import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/components/Users/userSlice';

export const store = configureStore({
  reducer: {
    users: userReducer,
  },
});
