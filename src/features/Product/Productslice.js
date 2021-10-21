import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productApi from '../../api/productApi';
export const getProductCategory = createAsyncThunk(
  'product/productCategory',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await productApi.getProductCategory(payload);
      return response.data.results;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
const productSlice = createSlice({
  name: 'product',
  initialState: {
    list: [],
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
    [getProductCategory.pending]: (state) => {
      state.status = 'getProductCategory.pending';
    },
    [getProductCategory.fulfilled]: (state, { payload }) => {
      state.list = payload;
      state.status = 'getProductCategory.fulfilled';
    },
    [getProductCategory.rejected]: (state, { payload }) => {
      state.errorMessage = payload.errorMessage;
      state.status = 'getProductCategory.rejected';
    },
  },
});
const { actions, reducer } = productSlice;
export const productSelector = (state) => state.product;
export default reducer;
export const { clearState } = actions;
