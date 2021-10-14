import React from 'react';
import Header from '../../components/header/header';
import Product from '../Product/Product';
import styles from './main.module.css';
import Slider from './components/slider/slider';
import Footer from '../../components/Footer/Footer';
const Main = () => {
  return (
    <div>
      <div className={styles.Header}>
        <Header />
      </div>
      <Slider />
      <div className={styles.grid}>
        <Product />
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default Main;
