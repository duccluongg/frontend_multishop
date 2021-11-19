import React from 'react';
import styles from '../Checkout.module.css';
import { useSelector } from 'react-redux';
import formatCash from '../../../constants/formatPrice';
const SlideCheckOut = () => {
  const cart = useSelector((state) => state.cart);
  console.log(cart.cartItems);
  const checkoutOrder = () => {};
  console.log(cart);
  return (
    <div className={styles.col6}>
      <div className={styles.headerSub}>Đơn hàng</div>
      <div className={styles.listItem}>
        {cart.cartItems.map((item) => (
          <div className={styles.item}>
            <div className={styles.itemInfo}>
              <img src={item.thumbnail} alt="" />
              <div>
                <div className={styles.itemName}>{item.name}</div>
                <div className={styles.itemQuantity}>x {item.cartQuantity}</div>
              </div>
            </div>
            <div className={styles.itemPrice}>
              {' '}
              {formatCash((item.price * item.cartQuantity).toString())} đ
            </div>
          </div>
        ))}
        <div className={styles.totalPrice}>
          <div>Tổng cộng</div>
          <span> {formatCash(cart.cartTotalAmount.toString())} đ</span>
        </div>
      </div>
      <div className={styles.btn}>
        <button onClick={checkoutOrder} className={styles.button}>
          Thanh toán
        </button>
      </div>
    </div>
  );
};

export default SlideCheckOut;
