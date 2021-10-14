import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './sideBar.module.css';
import { Link } from 'react-router-dom';
const Sidebar = () => {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    const getCategoryAPI = 'https://yshuynh.pythonanywhere.com/api/categories';
    axios
      .get(getCategoryAPI)
      .then((res) => {
        setCategory(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert('Xảy ra lỗi');
      });
  }, []);
  return (
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
  );
};

export default Sidebar;
