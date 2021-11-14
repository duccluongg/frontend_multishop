import React from 'react';
import InfoCheckout from './Components/InfoCheckout';
import SlideCheckOut from './Components/SlideCheckOut';
import styles from './Checkout.module.css';
import Header from '../../components/header/header';
import Footer from '../../components/Footer/Footer';
const Checkout = () => {
  return (
    <React.Fragment>
      <Header />
      <div className={styles.container}>
        <InfoCheckout />
        <SlideCheckOut />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Checkout;
