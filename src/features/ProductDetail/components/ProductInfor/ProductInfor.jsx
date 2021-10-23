import styles from '../../ProductDetail.module.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AddToCartForm from '../AddToCartForm/AddToCartForm';
import { useDispatch } from 'react-redux';
import formatCash from '../../../../constants/formatPrice';
// import { addToCart } from 'features/Cart/cartSlice';
import { Snackbar } from '@material-ui/core';
function ProductInfor(props) {
  const { product } = props;
  // const dispatch = useDispatch();
  // const [open, setOpen] = useState(false);

  // const handleClose = (event, reason) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }
  //   setOpen(false);
  // };

  // const handleAddToCartForm = ({ quantity }) => {
  //   const action = addToCart({
  //     id: product.id,
  //     product,
  //     quantity,
  //   });
  //   dispatch(action);

  //   setOpen(true);
  // };

  return (
    <div>
      {/* <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={handleClose} severity="success">
          Thêm vào giỏ hàng thành công
        </Alert>
      </Snackbar> */}
      <h4 className={styles.ProductName}>{product?.name}</h4>
      <h5 className={styles.ProductBand}>{product?.brand?.name}</h5>
      <p className={styles.ProductDescription}>{product?.description}</p>

      <div className={styles.ProductCartWapper}>
        <div className={styles.ProductPriceWapper}>
          {formatCash(`${product?.sale_price}`)} đ
          {console.log(typeof `${product?.sale_price}`)}
        </div>
        {/* <AddToCartForm onSubmit={handleAddToCartForm} /> */}
      </div>
    </div>
  );
}

export default ProductInfor;
