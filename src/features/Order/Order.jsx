import React from 'react';
import ListOrder from './Components/ListOrder';
import SlideOrder from './Components/SlideOrder';
import styles from './Order.module.css';
import Header from '../../components/header/header';
import Footer from '../../components/Footer/Footer';
const Order = () => {
  return (
    <React.Fragment>
      <Header />
      <div className={styles.container}>
        <SlideOrder />
        <ListOrder />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Order;
