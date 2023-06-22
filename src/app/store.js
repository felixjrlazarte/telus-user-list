import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './slices/users/userSlice';

const rootReducer = combineReducers({
  users: userReducer
});

export const store = preloadedState =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });