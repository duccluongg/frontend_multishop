import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import categoryApi from '../../api/categoryApi';
export const getCategoryApi = createAsyncThunk(
  'Category/Category',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await categoryApi.getCategories(payload);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
const categorySlice = createSlice({
  name: 'category',
  initialState: {
    listCategory: [],
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
    [getCategoryApi.pending]: (state) => {
      state.status = 'getCategoryApi.pending';
    },
    [getCategoryApi.fulfilled]: (state, { payload }) => {
      state.listCategory = payload;
      state.status = 'getCategoryApi.fullfilled';
    },
    [getCategoryApi.rejected]: (state, { payload }) => {
      state.errorMessage = payload.errorMessage;
      state.status = 'getCategoryApi.rejected';
    },
  },
});
const { actions, reducer } = categorySlice;
export const categorySelector = (state) => state.category;
export default reducer;
export const { clearState } = actions;
