import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
export const registerUser = createAsyncThunk(
  'users/signupUser',
  async ({ userName, email, passWord, address, name, phone }, thunkAPI) => {
    try {
      const response = await fetch(
        'https://yshuynh.pythonanywhere.com/api/register',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: userName,
            password: passWord,
            email,
            name,
            address,
            phone_number: phone,
          }),
        }
      );
      // let data = await response.json();
      // if (response.status === 200) {
      //   localStorage.setItem('token', data.token);
      //   return {
      //     ...data,
      //     username: userName,
      //     email: email,
      //     name: name,
      //     address: address,
      //     phone: phone,
      //   };
      // } else {
      //   return thunkAPI.rejectWithValue(data);
      // }
    } catch (e) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
export const registerSlice = createSlice({
  name: 'register',
  initialState: {
    username: '',
    email: '',
    name: '',
    address: '',
    phone: '',
    isFetching: false,
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

  // registerSlice
  extraReducers: {
    [registerUser.fulfilled]: (state, { payload }) => {
      state.isSuccess = true;
    },
    [registerUser.pending]: (state) => {
      state.isFetching = true;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = 'Tài khoản đã tồn tại';
    },
  },
});
const { actions, reducer } = registerSlice;
export default reducer;
export const registerSelector = (state) => state.register;
export const { clearState } = actions;
