import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/Auth/components/authSlice';
import productReducer from '../features/Product/Productslice';
import categoryReducer from '../features/Product/Categoryslice';
import snackbarReducer from '../components/CustomSnackBar/snackBarSlide';
const rootReducer = {
  auth: authReducer,
  product: productReducer,
  category: categoryReducer,
  snackbar: snackbarReducer,
};
const store = configureStore({
  reducer: rootReducer,
});
export default store;
