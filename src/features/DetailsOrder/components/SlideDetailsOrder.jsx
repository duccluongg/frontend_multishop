import React, { useEffect, useState } from 'react';
import styles from '../DetailsOrder.module.css';
import { useHistory } from 'react-router';
import storageUser from '../../../constants/storageUser';
import axios from 'axios';
const SlideDetailsOrder = () => {
  const [user, setUser] = useState({});
  const history = useHistory();
  const toAcc = () => history.push('/account');
  const toCart = () => history.push('/cart');
  const toOrder = () => history.push('/order');
  useEffect(() => {
    const getApi = `https://yshuynh.pythonanywhere.com/api/user/me`;
    axios
      .get(getApi, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem(storageUser.TOKEN)}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      });
  }, []);
  return (
    <div className={styles.col3}>
      <div className={styles.header}>
        <img
          alt="ava"
          src="https://st2.depositphotos.com/2703645/11476/v/450/depositphotos_114764528-stock-illustration-man-avatar-character.jpg"
          className={styles.imgHeader}
        />
        <div className={styles.nameHeader}>{user.name}</div>
      </div>
      <div className={styles.list}>
        <div className={styles.item1} onClick={toAcc}>
          <i className="far fa-user"></i>Tài khoản của tôi
        </div>
        <div className={styles.item1} onClick={toCart}>
          <i className="fas fa-shopping-cart"></i>Giỏ hàng
        </div>
        <div className={styles.item1} onClick={toOrder}>
          <i className="fas fa-list"></i>Đơn hàng
        </div>
      </div>
    </div>
  );
};

export default SlideDetailsOrder;
