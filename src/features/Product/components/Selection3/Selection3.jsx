import React from 'react';
import styles from './Selection3.module.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router';
import formatCash from '../../../../constants/formatPrice';
import Button from '../../../../components/Button/button';
import { useDispatch, useSelector } from 'react-redux';
import { getProductCategory, productSelector } from '../../Productslice';
import { categorySelector, getCategoryApi } from '../../Categoryslice';
const Selection3 = () => {
  const [product, setProduct] = useState([]);
  const { list } = useSelector(productSelector);
  const dispatch = useDispatch();
  const [category, setCategory] = useState([]);
  const history = useHistory();
  useEffect(() => {
    const getApi = `http://localhost:5000/product/getByCategoryId/615a7a8b9fc5e7b836358338`;
    axios.get(getApi).then((response) => {
      setProduct(response.data.data);
    });
  }, []);
  useEffect(() => {
    const getApi = `http://localhost:5000/category/615a7a8b9fc5e7b836358338`;
    axios.get(getApi).then((response) => {
      setCategory(response.data.data);
      // console.log(response.data.data);
    });
  }, []);
  const click = () => {
    history.push(`/productList/615a7a8b9fc5e7b836358338`);
  };
  return (
    <div className={styles.selection}>
      <div className={styles.header}>
        <span className={styles.title}>{category.name}</span>
      </div>
      <div className={styles.grid__column10}>
        <div className={styles.home__product}>
          <div className={styles.grid__row}>
            {product.slice(24, 28).map((item) => (
              <Link
                to={`/productDetail/${item.id}`}
                key={item.id}
                className={styles.grid__column24}
              >
                <div className={styles.home__productitems}>
                  <div
                    className={styles.home__productitemsimg}
                    style={{
                      backgroundImage: `url(${item.productThumbnail})`,
                    }}
                  ></div>
                  <h4 className={styles.home__productitemsname}>
                    {item.productName}
                  </h4>
                  <div className={styles.home__productprice}>
                    <span className={styles.home__productitemsprice}>
                      {formatCash(item.salePrice)} đ
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

export default Selection3;
