import React from 'react';
import styles from '../Order.module.css';
import { useHistory } from 'react-router';
const SlideOrder = () => {
  const history = useHistory();
  const toAcc = () => history.push('/account');
  const toCart = () => history.push('/cart');
  const toOrder = () => history.push('/order');
  return (
    <div className={styles.col3}>
      <div className={styles.header}>
        <img
          alt="ava"
          src="https://st2.depositphotos.com/2703645/11476/v/450/depositphotos_114764528-stock-illustration-man-avatar-character.jpg"
          className={styles.imgHeader}
        />
        <div className={styles.nameHeader}>Luong le</div>
      </div>
      <div className={styles.list}>
        <div className={styles.item} onClick={toAcc}>
          <i className="far fa-user"></i>Tài khoản của tôi
        </div>
        <div className={styles.item} onClick={toCart}>
          <i className="fas fa-shopping-cart"></i>Giỏ hàng
        </div>
        <div className={styles.item} onClick={toOrder}>
          <i className="fas fa-list"></i>Đơn hàng
        </div>
      </div>
    </div>
  );
};

export default SlideOrder;
