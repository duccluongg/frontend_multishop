import React from 'react';
import { useEffect, useState } from 'react';
import styles from './ProductList.module.css';
import Header from '../../components/header/header';
import Footer from '../../components/Footer/Footer';
import axios from 'axios';
import { useLocation, useParams } from 'react-router';
import { useHistory } from 'react-router';
import ProductFilter from './components/ProductFilter/ProductFilter';
import queryString from 'query-string';
import ClipLoader from 'react-spinners/ClipLoader';
import Pagination from '../../components/Pagination/Pagination';
import EachProduct from './components/EachProduct/EachProduct';
import SlideBar from './components/SlideBar/SlideBar';
const Productlist = () => {
  const history = useHistory();
  const { id } = useParams();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    page_size: 12,
    totalRows: 11,
  });
  const [filters, setFilters] = useState({
    page_size: 12,
    page: 1,
  });
  useEffect(() => {
    window.scrollTo(0, 0);
    const param = queryString.stringify(filters);
    const brandId = query.get('brand');
    const getProductAPI = `https://yshuynh.pythonanywhere.com/api/products?${param}&category=${id}&brands=${brandId} `;
    axios
      .get(getProductAPI)
      .then((res) => {
        const { page, page_size, total, results } = res?.data;
        if (res?.data) {
          setProduct(results);
          setPagination({ page, page_size, total });
        }
      })
      .catch((err) => {
        console.log(err);
        alert('Xảy ra lỗi');
      });
  }, [id, filters]);
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
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handlePageChange = (newPage) => {
    console.log(newPage);
    setFilters({
      ...filters,
      page: newPage,
    });
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };
  const handleFiltersChange = (newFilters) => {
    const filters = {
      ...newFilters,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };
  return (
    <React.Fragment>
      {loading ? (
        <div className={styles.sweetLoading}>
          <ClipLoader loading={loading} size={50} />
        </div>
      ) : (
        <React.Fragment>
          <Header />
          <div className={styles.container}>
            <div className={styles.grid}>
              <div className={styles.grid_row}>
                <div className={styles.col2}>
                  <SlideBar category={category} />
                </div>
                <div className={styles.grid__column10}>
                  {/* <ProductFilter onChange={handleFiltersChange} /> */}
                  <EachProduct product={product} />
                </div>
              </div>
            </div>
            <Pagination
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          </div>
          <Footer />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Productlist;
