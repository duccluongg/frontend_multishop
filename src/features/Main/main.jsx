import React from 'react';
import Header from '../../components/header/header';
import Product from '../Product/Product';
import styles from './main.module.css';
import Slider from './components/slider/slider';
import Footer from '../../components/Footer/Footer';
// import ClipLoader from 'react-spinners/ClipLoader';
const Main = () => {
  // const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 1500);
  // }, []);
  return (
    <React.Fragment>
      {/* {loading ? (
        <div className={styles.sweetLoading}>
          <ClipLoader loading={loading} size={50} />
        </div>
      ) : ( */}
      <div className={styles.main}>
        <div className={styles.Header}>
          <Header />
        </div>
        <Slider />
        <div className={styles.grid}>
          <Product />
        </div>
        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Main;
