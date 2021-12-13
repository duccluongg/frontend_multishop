import React, { useEffect, useState } from 'react';
import styles from '../Checkout.module.css';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import storageUser from '../../../constants/storageUser.js';
import { clearCart } from '../../Cart/cartSlice';
const Modal = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [idCart, setIdCart] = useState('');
  useEffect(() => {
    const getCart = `https://yshuynh.pythonanywhere.com/api/user/carts`;
    axios
      .get(getCart, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem(storageUser.TOKEN)}`,
        },
      })
      .then((response) => {
        setIdCart(
          response.data.map((item) => {
            return String(item?.id);
          })
        );
      });
  }, []);
  const toHisOrder = () => {
    history.push('/order');
    const getCart = `https://yshuynh.pythonanywhere.com/api/user/carts`;
    axios
      .delete(getCart, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem(storageUser.TOKEN)}`,
        },
        data: idCart,
      })
      .then((response) => {
        console.log(response.data);
      });
    dispatch(clearCart());
  };
  return (
    <div className={styles.modalContent}>
      <div className={styles.notify}>Thanh toán thành công</div>
      <div className={styles.subNotify}>Bạn muốn làm gì tiếp theo</div>
      <div className={styles.box}>
        <button onClick={() => toHisOrder()}>Lịch sử đơn hàng</button>
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
