import React, { useEffect, useState } from 'react';
import ProductInfor from './components/ProductInfor/ProductInfor';
import { Link } from 'react-router-dom';
import ProductRelated from './components/ProductRelated/ProductRelated';
import styles from './ProductDetail.module.css';
import Header from '../../components/header/header';
import axios from 'axios';
import { useParams } from 'react-router';
import Footer from '../../components/Footer/Footer';
import ClipLoader from 'react-spinners/ClipLoader';
function ProductDetail(props) {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  // useEffect(() => {
  //     const token = localStorage.getItem(StorageUser.TOKEN);
  //     if (!token) {
  //       history.replace('/login1');
  //     }
  //   });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    setLoading(true);
  }, []);
  useEffect(() => {
    if (id) {
      const getApi = `https://yshuynh.pythonanywhere.com/api/products/${id}`;
      axios.get(getApi).then((response) => {
        setProduct(response.data);
      });
      setLoading(true);
    }
  }, [id]);
  return (
    <React.Fragment>
      {loading ? (
        <div className={styles.sweetLoading}>
          <ClipLoader loading={loading} size={50} />
        </div>
      ) : (
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
                <ProductInfor />
              </div>
              <div className={styles.RelatedWapper}>
                <ProductRelated />
              </div>
            </div>
          </div>
          <Footer />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default ProductDetail;
