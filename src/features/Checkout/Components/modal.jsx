import React from 'react';
import styles from '../Checkout.module.css';
import { useHistory } from 'react-router';
const Modal = () => {
  const history = useHistory();
  return (
    <div className={styles.modalContent}>
      <div className={styles.notify}>Thanh toán thành công</div>
      <div className={styles.subNotify}>Bạn muốn làm gì tiếp theo</div>
      <div className={styles.box}>
        <button
          onClick={() => {
            history.push('/order');
          }}
        >
          Lịch sử đơn hàng
        </button>
        <button
          onClick={() => {
            history.push('/productList/1');
          }}
        >
          Tiếp tục mua hàng
        </button>
      </div>
    </div>
  );
};

export default Modal;
