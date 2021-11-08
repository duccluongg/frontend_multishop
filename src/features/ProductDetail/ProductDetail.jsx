import React, { useEffect, useState } from 'react';
import ProductInfo from './components/ProductInfo/ProductInfo';
import ProductRelated from './components/ProductRelated/ProductRelated';
import styles from './ProductDetail.module.css';
import Header from '../../components/header/header';
import axios from 'axios';
import { useParams } from 'react-router';
import Footer from '../../components/Footer/Footer';
import ClipLoader from 'react-spinners/ClipLoader';
import Comment from './components/comment/Comment';
import storageUser from '../../constants/storageUser';
import ProductImg from './components/ProductImg/ProductImg';
function ProductDetail() {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [user, setUser] = useState({});
  useEffect(() => {
    const getApi = `https://yshuynh.pythonanywhere.com/api/user/me`;
    if (sessionStorage.getItem(storageUser.TOKEN)) {
      axios
        .get(getApi, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem(
              storageUser.TOKEN
            )}`,
          },
        })
        .then((response) => {
          setUser(response.data);
        });
    }
  }, []);
  useEffect(() => {
    if (id) {
      const getApi = `https://yshuynh.pythonanywhere.com/api/products/${id}`;
      axios.get(getApi).then((response) => {
        setProduct(response.data);
      });
    }
  }, [id]);
  useEffect(() => {
    setLoading(true);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);
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
              <div className={styles.row}>
                <div className={styles.grid__column5}>
                  <ProductImg product={product} />
                </div>
                <div className={styles.grid__column5}>
                  <ProductInfo product={product} user={user} />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.col7}>
                  <h3 className={styles.headerProductDescription}>
                    Mô tả sản phẩm
                  </h3>
                  <div
                    className={styles.ProductDescription}
                    dangerouslySetInnerHTML={{ __html: product?.description }}
                  ></div>
                </div>
                <div className={styles.col3}>
                  <div className={styles.techInfor}>
                    <h3 className={styles.inforHeader}>Thông số kĩ thuật</h3>
                    <div className={styles.inforContainer}>
                      {product.specifications?.map((item) => (
                        <div key={item.id} className={styles.inforItem}>
                          <div className={styles.inforName}>{item.name}</div>
                          <div className={styles.inforValue}>{item.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <Comment user={user} currentUserId={1} />
              <div className={styles.RelatedWapper}>
                <ProductRelated />
              </div>
            </div>
          </div>
          <Footer />
        </React.Fragment>
      )}
    </React.Fragment>
    // a cmt heest lai di roi goi cung dc
    // em dat cai decription o dau
  );
}

export default ProductDetail;
