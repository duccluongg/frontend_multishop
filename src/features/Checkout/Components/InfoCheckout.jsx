import React from 'react';
import styles from '../Checkout.module.css';

const InfoCheckout = (props) => {
  const { userInfo } = props;
  return (
    <div className={styles.col4}>
      <div className={styles.header}>Thông tin nhận hàng</div>
      <div className={styles.listDetails}>
        <div className={styles.listItems}>
          <div className={styles.itemDetails1}>Tên</div>
          <div className={styles.itemDetails2}>{userInfo.name}</div>
        </div>
        <div className={styles.listItems}>
          <div className={styles.itemDetails1}>Email</div>
          <div className={styles.itemDetails2}>{userInfo.email}</div>
        </div>
        <div className={styles.listItems}>
          <div className={styles.itemDetails1}>Số điện thoại</div>
          <div className={styles.itemDetails2}>{userInfo.phone_number}</div>
        </div>
        <div className={styles.listItems}>
          <div className={styles.itemDetails1}>Địa chỉ</div>
          <div className={styles.itemDetails2}>{userInfo.address}</div>
        </div>
      </div>
    </div>
  );
};

export default InfoCheckout;
