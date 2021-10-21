import React from 'react';
import styles from '../../ProductList.module.css';
import { Link } from 'react-router-dom';
import formatCash from '../../../../constants/formatPrice';
const EachProduct = (props) => {
  const { product } = props;
  return (
    <div className={styles.home__product}>
      <div className={styles.grid__row}>
        {product.map((item) => (
          <Link
            to={`/productDetail/${item.id}`}
            key={item.id}
            className={styles.grid__column24}
          >
            <div className={styles.home__productitems}>
              <div
                className={styles.home__productitemsimg}
                style={{
                  backgroundImage: `url(${item.thumbnail})`,
                }}
              ></div>
              <h4 className={styles.home__productitemsname}>{item.name}</h4>
              <div className={styles.home__productprice}>
                <span className={styles.home__productitemsprice}>
                  {formatCash(item.sale_price.toString())} đ
                </span>
                <div className={styles.btn_cart}>
                  <i className="fas fa-search"></i>
                  Details
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EachProduct;
