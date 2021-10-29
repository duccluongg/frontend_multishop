import styles from './ProductInfor.module.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { useParams } from 'react-router-dom';
import AddToCartForm from '../AddToCartForm/AddToCartForm';
// import { useDispatch } from 'react-redux';
import formatCash from '../../../../constants/formatPrice';
// import { addToCart } from 'features/Cart/cartSlice';
// import { Snackbar } from '@material-ui/core';
import storageUser from '../../../../constants/storageUser';
function ProductInfor(props) {
  const { product, user } = props;
  const salePrice = (product.sale_price * product.discount) / 100;
  const Price = product.sale_price - salePrice;
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
    <div className={styles.info}>
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
      <div
        className={styles.ProductDescription}
        dangerouslySetInnerHTML={{ __html: product?.short_description }}
      ></div>

      <div className={styles.ProductCartWapper}>
        <div className={styles.ProductPriceWapper}>
          {formatCash(`${product?.sale_price}`)} đ
        </div>
        <div className={styles.ProductPriceSale}>
          {formatCash(`${Price}`)} đ
        </div>
        {/* <AddToCartForm onSubmit={handleAddToCartForm} /> */}
        {user?.id ? (
          <AddToCartForm />
        ) : (
          <div className={styles.needToLogin}>
            {' '}
            Bạn cần phải đăng nhập để mua sản phẩm
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductInfor;
