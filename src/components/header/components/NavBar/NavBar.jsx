import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './NavBar.module.css';
import { Link } from 'react-router-dom';
import PulseLoader from 'react-spinners/PulseLoader';
const NavBar = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getCategoryAPI = 'https://yshuynh.pythonanywhere.com/api/categories';
    axios
      .get(getCategoryAPI)
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert('Xảy ra lỗi');
      });
  }, []);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  return (
    <React.Fragment>
      {loading ? (
        <div className={styles.sweetLoading}>
          <PulseLoader loading={loading} size={5} color={'#333'} />
        </div>
      ) : (
        <div className={styles.sideBar}>
          <Link to="/" className={styles.sideBarItem}>
            Trang chủ
          </Link>
          {category.map((item) => (
            <Link
              to={`/productList/${item.id}`}
              key={item.id}
              className={styles.sideBarItem}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </React.Fragment>
  );
};

export default NavBar;
