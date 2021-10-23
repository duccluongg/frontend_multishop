import React, { useEffect, useState } from 'react';
import ProductInfor from './components/ProductInfor/ProductInfor';
import { Link } from 'react-router-dom';
import ProductRelated from './components/ProductRelated/ProductRelated';
import styles from './ProductDetail.module.css';
import Header from '../../components/header/header';
import axios from 'axios';
import { useParams } from 'react-router';
import Footer from '../../components/Footer/Footer';
import ProductRating from './components/ProductRating/ProductRating';
function ProductDetail(props) {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const getApi = `https://yshuynh.pythonanywhere.com/api/products/${id}`;
      axios.get(getApi).then((response) => {
        setProduct(response.data);
      });
    }
  }, [id]);
  return (
    <React.Fragment>
      <Header />
      <div className={styles.container_productDetails}>
        <div className={styles.grid__row}>
          <div className={styles.grid__column5}>
            <div className={styles.back_btn}>
              <Link to={'/'} className={styles.btn_back}>
                <i className="fas fa-arrow-left"></i>
                Back
              </Link>
            </div>
            <img
              src={product?.thumbnail}
              alt=""
              className={styles.product_img}
            />
          </div>
          <div className={styles.grid__column5}>
            <ProductInfor product={product} />
          </div>
          <ProductRating product={product} />
          <div className={styles.RelatedWapper}>
            <ProductRelated />
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default ProductDetail;
