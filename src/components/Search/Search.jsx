import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Search.module.css';
import PropTypes from 'prop-types';

const Search = ({ onChange }) => {
  const [searchList, setSearchList] = useState([]);
  const handleSearch = (e) => {
    const temp = e.target.value;
    if (temp == '') {
      setSearchList([]);
    } else {
      const getApi = `https://yshuynh.pythonanywhere.com/api/products/lite?page_size=10&search_name=${temp}`;
      axios.get(getApi).then((response) => {
        setSearchList(response.data.results);
      });
    }
  };
  console.log(searchList);

  return (
    <div>
      <div className={styles.searchBox}>
        <input
          className={styles.searchTxt}
          type="text"
          name="productName_contains"
          placeholder="Type to search"
          onKeyUp={handleSearch}
          autoComplete="off"
        />
        <button type="submit" className={styles.searchBtn}>
          <i className="fas fa-search"></i>
        </button>
      </div>
      <div>
        {searchList.map((item) => (
          <div>{item.name}</div>
        ))}
      </div>
    </div>
  );
};
Search.propTypes = {
  onChange: PropTypes.func,
};
export default Search;
