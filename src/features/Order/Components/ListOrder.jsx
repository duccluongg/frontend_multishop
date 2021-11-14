import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../Order.module.css';
import storageUser from '../../../constants/storageUser';
const ListOrder = () => {
  const [order, setOrder] = useState({});
  console.log(order);
  useEffect(() => {
    const getApi = `https://yshuynh.pythonanywhere.com/api/user/orders?page=1&page_size=5`;
    axios
      .get(getApi, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem(storageUser.TOKEN)}`,
        },
      })
      .then((response) => {
        setOrder(response.data);
      });
  }, []);
  return (
    <div className={styles.col7}>
      {/* {order.results.map((item) => (
        <div className={styles.itemOrder}>
          <div className={styles.row1}>
            <div className={styles.brandName}>Multishop</div>
            <div className={styles.status}>{item.status}</div>
          </div>
          <div className={styles.row2}>
            <div className={styles.left}>
              <img
                src="https://lh3.googleusercontent.com/9jsqa2sCGaVFLcy7vVx1EuW0ngB3kyEHzm3KZLpyAeblS6WmyQkwH3TZfzSNPrVingimxLpN20fogK123T3s"
                alt=""
              />
              <div className={styles.info}>
                <div className={styles.itemName}>
                  Laptop Acer Swift 3 SF315-52-52Z7 (NX.GZBSV.004) (15.6"
                  FHD/i5-8250U/4GB/1TB HDD/UHD 620/Win10/1.6 kg)
                </div>
                <div className={styles.count}>x10</div>
              </div>
            </div>
            <div className={styles.priceBox}>
              <div className={styles.salePrice}>80.000đ</div>
              <div className={styles.price}>55.900đ</div>
            </div>
          </div>
          <div className={styles.row3}>
            <div className={styles.totalPrice}>
              Tổng số tiền: <span>55.900đ </span>
            </div>
          </div>
        </div>
      ))} */}
    </div>
  );
};

export default ListOrder;
