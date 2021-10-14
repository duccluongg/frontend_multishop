import React from 'react';
import styles from './button.module.css';
const Button = () => {
  return (
    <div className={styles.btn}>
      <button className={styles.button}>Xem tất cả sản phẩm</button>
    </div>
  );
};

export default Button;
