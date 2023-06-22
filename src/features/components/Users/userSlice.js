import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

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

export const { increment, decrement, incrementByAmount, deleteUser } = counterSlice.actions;

export const userStateValues = (state) => state.users;

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const getUserList = createAsyncThunk(
  'users/fetchUserList',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/users")
      return data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export default counterSlice.reducer;
