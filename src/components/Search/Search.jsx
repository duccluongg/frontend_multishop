import React from 'react';
import styles from './Search.module.css';
import PropTypes from 'prop-types';

const Search = ({ onChange }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    // dispatch
  };
  return (
    <div>
      <form onSubmit={handleSearch}>
        <div className={styles.searchBox}>
          <input
            className={styles.searchTxt}
            type="text"
            name="productName_contains"
            placeholder="Type to search"
            onChange={(e) => onChange(e.target.value)}
          />
          <button type="submit" className={styles.searchBtn}>
            <i className="fas fa-search"></i>
          </button>
        </div>
      </form>
    </div>
  );
};
Search.propTypes = {
  onChange: PropTypes.func,
};
export default Search;
