import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/Auth/components/authSlice';
import productReducer from '../features/Product/Productslice';
import categoryReducer from '../features/Product/Categoryslice';
import snackbarReducer from '../components/CustomSnackBar/snackBarSlide';
import registerReducer from '../features/Register/registerSlice';
import cartReducer, { getTotals } from '../features/Cart/cartSlice';
const rootReducer = {
  auth: authReducer,
  product: productReducer,
  category: categoryReducer,
  cart: cartReducer,
  snackbar: snackbarReducer,
  register: registerReducer,
};
const store = configureStore({
  reducer: rootReducer,
});
store.dispatch(getTotals());
export default store;
