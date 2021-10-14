import React from 'react';
import Sidebar from './components/sideBar/sideBar';
import styles from './header.module.css';

const Header = () => {
  return (
    <React.Fragment>
      <div className={styles.container}>
        <div>
          Hotline đặt hàng: <b>1900 6555</b>
        </div>
        <div>Multishop</div>
        <div className={styles.info}>
          <div className={styles.acc}>Tài khoản</div>
          <div className={styles.cart}>
            Giỏ hàng
            <i className="fas fa-shopping-cart"></i>
          </div>
        </div>
      </div>
      <div className={styles.border}></div>
      <Sidebar />
    </React.Fragment>
  );
};

export default Header;
