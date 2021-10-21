import React from 'react';
import styles from './Selection4.module.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import formatCash from '../../../../constants/formatPrice';
import axios from 'axios';
import { useParams } from 'react-router';
const Selection4 = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    const getApi = `https://yshuynh.pythonanywhere.com/api/products?&category=5`;
    axios.get(getApi).then((response) => {
      setProduct(response.data.results);
    });
  }, []);
  useEffect(() => {
    const getApi = `https://yshuynh.pythonanywhere.com/api/categories/5`;
    axios.get(getApi).then((response) => {
      setCategory(response.data);
      // console.log(response.data.data);
    });
  }, []);
  return (
    <div className={styles.Selection4}>
      <div style={styles.header}>
        <div className={styles.title}>{category.name}</div>
      </div>
      <div className={styles.container}>
        <img
          src="https://i.pinimg.com/564x/a7/41/df/a741dfea9d7bfc27fdbc251681298c7a.jpg"
          alt=""
        />
        {product.slice(0, 1).map((item) => (
          <Link
            to={`productDetail/${item.id}`}
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
              <span className={styles.home__productitemsname}>{item.name}</span>
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

export default Selection4;
