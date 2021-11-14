import React from 'react';
import styles from '../Checkout.module.css';
const InfoCheckout = () => {
  return (
    <div className={styles.col4}>
      <div className={styles.header}>Thông tin nhận hàng</div>
      <div className={styles.listDetails}>
        <div className={styles.listItems}>
          <div className={styles.itemDetails1}>Tên</div>
          <div className={styles.itemDetails2}>Lương Lê</div>
        </div>
        <div className={styles.listItems}>
          <div className={styles.itemDetails1}>Email</div>
          <div className={styles.itemDetails2}>luongdang1999@gmail.com</div>
        </div>
        <div className={styles.listItems}>
          <div className={styles.itemDetails1}>Số điện thoại</div>
          <div className={styles.itemDetails2}>0964043693</div>
        </div>
        <div className={styles.listItems}>
          <div className={styles.itemDetails1}>Địa chỉ</div>
          <div className={styles.itemDetails2}>383 nguyễn lương bằng</div>
        </div>
      </div>
      <div className={styles.methodToPay}>
        <span>Phương thức thanh toán</span>
        <div>
          <input type="radio" />  <label>Momo</label>
        </div>
        <div>
          <input type="radio" />  <label>Thanh toán sau khi nhận hàng</label>
        </div>
      </div>
    </div>
  );
};

export default InfoCheckout;