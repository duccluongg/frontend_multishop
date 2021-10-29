import React from 'react';
import styles from './Selection1.module.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import formatCash from '../../../../constants/formatPrice';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getProductCategory, productSelector } from '../../Productslice';
import { categorySelector, getCategoryApi } from '../../Categoryslice';
const Selection1 = () => {
  const { list } = useSelector(productSelector);
  const { listCategory } = useSelector(categorySelector);
  const dispatch = useDispatch();
  const history = useHistory();
  const click = () => {
    history.push(`/productList/1`);
  };
  useEffect(() => {
    dispatch(getProductCategory('1'));
  }, []);
  useEffect(() => {
    dispatch(getCategoryApi('1'));
  }, []);
  return (
    <div className={styles.selection}>
      <div className={styles.header}>
        <span className={styles.title}>{listCategory.name}</span>
      </div>
      <div className={styles.grid__column10}>
        <div className={styles.home__product}>
          <div className={styles.grid__row}>
            {list.slice(0, 4).map((item) => (
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
      </div>
      <div className={styles.btn}>
        <button onClick={click} className={styles.button}>
          Xem tất cả sản phẩm
        </button>
      </div>
    </div>
  );
};

export default Selection1;
