import styles from './ProductInfor.module.css';
import React from 'react';
import { useDispatch } from 'react-redux';
import formatCash from '../../../../constants/formatPrice';
import { addToCart } from '../../../Cart/cartSlice';
import storageUser from '../../../../constants/storageUser';
import { showSnackbar } from '../../../../components/CustomSnackBar/snackBarSlide';
import { SNACK_BAR_TYPE } from '../../../../constants/snackBarType';
import CustomSnackBar from '../../../../components/CustomSnackBar/CustomSnackBar';
import axios from 'axios';
function ProductInfo(props) {
  const { product, user } = props;
  const dispatch = useDispatch();
  const salePrice = (product.sale_price * product.discount) / 100;
  const Price = product.sale_price - salePrice;
  const handleAddToCart = (product) => {
    const getCart = `https://yshuynh.pythonanywhere.com/api/user/carts/add`;
    axios
      .put(
        getCart,
        {
          product: product.id,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem(
              storageUser.TOKEN
            )}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          dispatch(addToCart(product));
        }
      });
    dispatch(
      showSnackbar({
        type: SNACK_BAR_TYPE.SUCCESS,
        message: 'Thêm vào giỏ hàng thành công',
      })
    );
  };

  return (
    <div className={styles.info}>
      <CustomSnackBar />
      <h4 className={styles.ProductName}>{product?.name}</h4>
      <h5 className={styles.ProductBand}>{product?.brand?.name}</h5>

      {/* <div className={styles.star}>
        {Array(product?.avg_rating).fill(<i className="fas fa-star "></i>)}
        {Array(5 - product?.avg_rating).fill(<i className="far fa-star"></i>)}
      </div> */}

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
        {user?.id ? (
          <div className={styles.btn}>
            <button
              onClick={() => handleAddToCart(product)}
              className={styles.button}
            >
              Thêm vào giỏ hàng
            </button>
          </div>
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

export default ProductInfo;
