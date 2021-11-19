import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../api/userApi';
export const getUserInfo = createAsyncThunk(
  'userInfo',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await userApi.getProductCategory(payload);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: {
    list: {},
    status: '',
    errorMessage: '',
  },
  reducers: {
    clearState: (state) => {
      state.status = '';
      return state;
    },
  },
  extraReducers: {
    [getUserInfo.pending]: (state) => {
      state.status = 'getUserInfo.pending';
    },
    [getUserInfo.fulfilled]: (state, { payload }) => {
      state.list = payload;
      state.status = 'getUserInfo.fulfilled';
    },
    [getUserInfo.rejected]: (state, { payload }) => {
      state.errorMessage = 'bị lỗi';
      state.status = 'getUserInfo.rejected';
    },
  },
});
const { actions, reducer } = userInfoSlice;
export default reducer;
export const { clearState } = actions;
