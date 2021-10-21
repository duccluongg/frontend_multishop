import React from 'react';
import { useEffect, useState } from 'react';
import styles from './ProductList.module.css';
import Header from '../../components/header/header';
import Footer from '../../components/Footer/Footer';
import axios from 'axios';
import { useParams } from 'react-router';
import { useHistory } from 'react-router';
import ProductFilter from './ProductFilter/ProductFilter';
import queryString from 'query-string';
import ClipLoader from 'react-spinners/ClipLoader';
import Pagination from '../../components/Pagination/Pagination';
import EachProduct from './components/EachProduct/EachProduct';
const Productlist = () => {
  const history = useHistory();
  const { id } = useParams();
  const [search, setSearch] = useState('');
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
    const getProductAPI = `http://yshuynh.pythonanywhere.com/api/products?${param}&category=${id}`;
    axios
      .get(getProductAPI)
      .then((res) => {
        const { page, page_size, total, results } = res?.data;
        if (res?.data) {
          setProduct(results);
          console.log(total);
          // Sai cho nay no dang tra ve 1 number
          setPagination({ page, page_size, total });

          // setLoading(true);
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
        // setLoading(true);
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
    }, 1500);
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
                  <div className={styles.category}>
                    <div className={styles.categoryHeading}>Danh mục</div>
                    <div className={styles.categoryList}>
                      <div className={styles.categoryItem}>
                        {category.map((item) => (
                          <div
                            onClick={() => {
                              history.push(`/productList/${item.id}`);
                            }}
                            key={item.id}
                            className={styles.categoryItemLink}
                          >
                            {item.name}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className={styles.categoryHeading}>TÌM THEO</div>
                    <div className={styles.categoryList}>
                      <div className={styles.categoryItem}>
                        <div className={styles.categoryItemLink}>
                          Giá sản phẩm
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.grid__column10}>
                  <ProductFilter onChange={handleFiltersChange} />
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
