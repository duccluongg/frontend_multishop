import React from 'react';
import styles from './Selection2.module.css';
import { useHistory } from 'react-router';
const Selection2 = () => {
  const history = useHistory();
  const clickScreen = () => {
    history.push('/productList/3');
  };
  const clickKeyBoard = () => {
    history.push('/productList/2');
  };
  const clickChair = () => {
    history.push('/productList/8');
  };
  return (
    <div className={styles.Selection2}>
      <div className={styles.wrapper}>
        <div className={styles.parent}>
          <img
            src="https://www.hanoicomputer.vn/media/lib/17-09-2020/cauhinhmaytinhchigame2020.jpg"
            className={styles.child}
            alt="ảnh pc"
          />
          <div className={styles.content}>
            <h3>BÀN PHÍM</h3>
            <div className={styles.btn}>
              <button onClick={clickKeyBoard} className={styles.button}>
                XEM THÊM
              </button>
            </div>
          </div>
        </div>
        <div className={styles.parent}>
          <img
            src="https://1.bp.blogspot.com/-wsFHUVRfODc/X7toIcrduhI/AAAAAAAAA_s/XjR0iRYOj5kZxhRdQAuhmOVeA2A7aqI4wCLcBGAsYHQ/s2048/techontop-huong-dan-trang-tri-goc-choi-game-1.jpg"
            className={styles.child}
            alt="ảnh pc"
          />
          <div className={styles.content}>
            <h3>CHUỘT</h3>
            <div className={styles.btn}>
              <button onClick={clickScreen} className={styles.button}>
                XEM THÊM
              </button>
            </div>
          </div>
        </div>
        <div className={styles.parent}>
          <img
            src="https://photo2.tinhte.vn/data/attachment-files/2020/01/4892451_CDFEF439-5FCD-4B2C-ADBE-0866D172A2F2.jpeg"
            className={styles.child}
            alt="ảnh pc"
          />
          <div className={styles.content}>
            <h3>GHẾ GAMING</h3>
            <div className={styles.btn}>
              <button onClick={clickChair} className={styles.button}>
                XEM THÊM
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Selection2;
