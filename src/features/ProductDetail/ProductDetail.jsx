import React, { useEffect, useState } from 'react';
import ProductInfor from './components/ProductInfor/ProductInfor';
import { Link } from 'react-router-dom';
import ProductRelated from './components/ProductRelated/ProductRelated';
import styles from './ProductDetail.module.css';
import Header from '../../components/header/header';
import axios from 'axios';
import { useParams } from 'react-router';
import Footer from '../../components/Footer/Footer';

function ProductDetail(props) {
  // const [loading, setLoading] = useState(false);
  // const history = useHistory();
  // useEffect(() => {
  //  setLoading(true)
  //  setTimeout(()=>{
  //    setLoading(false)
  //  },2000)
  // }, [])
  const [product, setproduct] = useState(null);
  const { id } = useParams();
  // useEffect(() => {
  //     const token = localStorage.getItem(StorageUser.TOKEN);
  //     if (!token) {
  //       history.replace('/login1');
  //     }
  //   });

  useEffect(() => {
    if (id) {
      const getApi = `http://localhost:5000/product/${id}`;
      axios.get(getApi).then((response) => {
        setproduct(response.data.data);
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
              src={product?.productThumbnail}
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
  );
}

export default ProductDetail;
