import React, { useEffect, useState } from 'react';
import styles from './header.module.css';
import axios from 'axios';
import NavBar from './components/NavBar/NavBar';
import storageUser from '../../constants/storageUser';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Header = () => {
  const [user, setUser] = useState({});
  const logout = () => {
    sessionStorage.removeItem(storageUser.TOKEN);
  };
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  useEffect(() => {
    const getApi = `https://yshuynh.pythonanywhere.com/api/user/me`;
    if (sessionStorage.getItem(storageUser.TOKEN)) {
      axios
        .get(getApi, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem(
              storageUser.TOKEN
            )}`,
          },
        })
        .then((response) => {
          setUser(response.data);
        });
    }
  }, []);

  return (
    <React.Fragment>
      <div className={styles.container}>
        <div>Multishop</div>
        <div className={styles.info}>
          {user?.id ? (
            <div className={styles.acc}>
              {user.name}
              <ul className={styles.notifyList}>
                <Link to="/account" className={styles.notifyItem}>
                  Thông tin cá nhân
                </Link>
                <Link to="/" className={styles.notifyItem}>
                  Lịch sử đơn hàng
                </Link>
                <Link
                  to="/Login"
                  onClick={logout}
                  className={styles.notifyItem}
                >
                  Đăng xuất
                </Link>
              </ul>
            </div>
          ) : (
            <div className={styles.acc}>
              Tài khoản
              <ul className={styles.notifyList}>
                <Link to="/login" className={styles.notifyItem}>
                  Đăng nhập
                </Link>
                <Link to="/register" className={styles.notifyItem}>
                  Đăng ký
                </Link>
              </ul>
            </div>
          )}
          <Link to="/cart" className={styles.cart}>
            Giỏ hàng
            <i className="fas fa-shopping-cart">
              {user?.id ? <span>{cartTotalQuantity}</span> : <span>0</span>}
            </i>
          </Link>
        </div>
      </div>
      <div className={styles.border}></div>
      <NavBar />
    </React.Fragment>
  );
};

export default Header;
