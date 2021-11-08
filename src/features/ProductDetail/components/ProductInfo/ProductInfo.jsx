import styles from './ProductInfor.module.css';
import React from 'react';
import { useDispatch } from 'react-redux';
import formatCash from '../../../../constants/formatPrice';
import { addToCart } from '../../../Cart/cartSlice';
function ProductInfo(props) {
  const { product, user } = props;
  const dispatch = useDispatch();
  const salePrice = (product.sale_price * product.discount) / 100;
  const Price = product.sale_price - salePrice;
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  return (
    <div className={styles.info}>
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
