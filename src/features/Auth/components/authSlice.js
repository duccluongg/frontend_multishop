import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../../../api/userApi';
import storageUser from '../../../constants/storageUser';

export const userLogin = createAsyncThunk(
  'user/login',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await userApi.login(payload);
      console.log(response);
      if (payload.remember)
        localStorage.setItem(storageUser.TOKEN, response.data.access_token);
      else
        sessionStorage.setItem(storageUser.TOKEN, response.data.access_token);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isRequesting: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isRequesting = false;
      state.isSuccess = false;
      return state;
    },
  },
  extraReducers: {
    [userLogin.pending]: (state) => {
      state.isRequesting = true;
      state.isSuccess = false;
      state.isError = false;
    },
    [userLogin.fulfilled]: (state) => {
      state.isRequesting = false;
      state.isSuccess = true;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.isRequesting = false;
      state.isError = true;
      state.errorMessage = 'Sai tên đăng nhập hoặc mật khẩu';
    },
  },
});
const { actions, reducer } = authSlice;
export const authSelector = (state) => state.auth;
export default reducer;
export const { clearState } = actions;
