import React from 'react';
import styles from '../../ProductDetail.module.css';
import { Link } from 'react-router-dom';
const ProductImg = (product) => {
  return (
    <React.Fragment>
      <div className={styles.back_btn}>
        <Link to={'/'} className={styles.btn_back}>
          <i className="fas fa-arrow-left"></i>
          Back
        </Link>
      </div>
      <img src={product?.thumbnail} alt="anhr" className={styles.product_img} />

      <div className={styles.listImg}>
        {product.images?.slice(0, 5)?.map((item) => (
          <img
            key={item.id}
            className={styles.imgDetails}
            src={item.url}
            alt="img"
          />
        ))}
      </div>
      <div className={styles.listImgBig}>
        {product.images?.slice(0, 5)?.map((item) => (
          <img
            key={item.id}
            className={styles.imgDetailsBig}
            src={item.url}
            alt="img"
          />
        ))}
      </div>
    </React.Fragment>
  );
};

export default ProductImg;
