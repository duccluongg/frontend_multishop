import React from 'react';
import { useEffect, useState } from 'react';
import styles from './ProductList.module.css';
import Header from '../../components/header/header';
import Footer from '../../components/Footer/Footer';
import formatCash from '../../constants/formatPrice';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { useHistory } from 'react-router';
import ReactPaginate from 'react-paginate';
import ProductFilter from './ProductFilter/ProductFilter';
import queryString from 'query-string';
const Productlist = () => {
  const history = useHistory();
  const { id } = useParams();
  const [search, setSearch] = useState('');
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    const getProductAPI = `http://localhost:5000/product/getByCategoryId/${id}`;
    axios
      .get(getProductAPI)
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        alert('Xảy ra lỗi');
      });
  }, [id]);

  useEffect(() => {
    const getCategoryAPI = 'http://localhost:5000/category/';
    axios
      .get(getCategoryAPI)
      .then((res) => {
        setCategory(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        alert('Xảy ra lỗi');
      });
  }, []);
  const handlePageChange = (data) => {
    console.log(data.selected);
  };
  const handleFiltersChange = (newFilters) => {
    const filters = {
      ...newFilters,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
    console.log(newFilters);
  };
  return (
    <div>
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
                    <div className={styles.categoryItemLink}>Giá sản phẩm</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.grid__column10}>
              <ProductFilter onChange={handleFiltersChange} />
              <div className={styles.home__product}>
                <div className={styles.grid__row}>
                  {product.map((item) => (
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
          </div>
        </div>
        <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          onPageChange={handlePageChange}
          containerClassName={styles.pagination}
          pageClassName={styles.item_pagination}
          pageCount={9}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Productlist;
