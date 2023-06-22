import { createSlice } from '@reduxjs/toolkit';
import { getUserList } from './userActions';

const initialState = {
  list: [],
  isFetching: false,
  error: null
};

export const counterSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    deleteUser: (state, action) => {
      let inputIndex = action.payload;
      state.list.splice(inputIndex, 1);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserList.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getUserList.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.list = payload;
      })
      .addCase(getUserList.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.list = [];
        state.error = payload;
      });
  },
});

export const { deleteUser } = counterSlice.actions;

export const userStateValues = (state) => state.users;

export default counterSlice.reducer;
