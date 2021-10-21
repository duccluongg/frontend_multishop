import React from 'react';
import styles from './header.module.css';
import Search from '../Search/Search';
import NavBar from './components/NavBar/NavBar';
const Header = () => {
  return (
    <React.Fragment>
      <div className={styles.container}>
        {/* <div>
          Hotline đặt hàng: <b>1900 6555</b>
        </div> */}
        <div>Multishop</div>
        <div className={styles.info}>
          <div className={styles.acc}>Tài khoản</div>
          <div className={styles.cart}>
            Giỏ hàng
            <i className="fas fa-shopping-cart"></i>
          </div>
          <Search />
        </div>
      </div>
      <div className={styles.border}></div>
      <NavBar />
    </React.Fragment>
  );
};

export default Header;
