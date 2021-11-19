import React from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/header/header';
import InfoOrder from './components/InfoOrder';
import SlideDetailsOrder from './components/SlideDetailsOrder';
import styles from './DetailsOrder.module.css';
const DetailsOrder = () => {
  return (
    <React.Fragment>
      <Header />
      <div className={styles.container}>
        <SlideDetailsOrder />
        <InfoOrder />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default DetailsOrder;
