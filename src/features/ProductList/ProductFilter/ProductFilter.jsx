import React from 'react';
import Search from '../../../components/Search/Search';
import styles from './ProductFilter.module.css';

const ProductFilter = ({ onChange }) => {
  const handleSearch = (newSearch) => {
    if (!onChange) return;

    const newFilters = {
      productName_contains: newSearch,
    };
    onChange(newFilters);
  };
  return (
    <div className={styles.Productfilter}>
      <Search onChange={handleSearch} />
    </div>
  );
};

export default ProductFilter;
