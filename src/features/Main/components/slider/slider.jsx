import React from 'react';
import styles from './slider.module.css';
const Slider = () => {
  return (
    <div className={styles.slider}>
      <figure>
        <div className={styles.sliderImg}>
          <div className={styles.modal}>
            <div className={styles.header}>Multishop</div>
            <div className={styles.title}>Build Your Dream </div>
          </div>
        </div>
      </figure>
    </div>
  );
};

export default Slider;
