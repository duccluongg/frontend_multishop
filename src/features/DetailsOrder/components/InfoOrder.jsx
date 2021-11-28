import React, { useEffect, useState } from 'react';
import styles from '../DetailsOrder.module.css';
import storageUser from '../../../constants/storageUser';
import axios from 'axios';
import { useParams } from 'react-router';
import formatCash from '../../..//constants/formatPrice.js';
const InfoOrder = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState({});
  const [item, setItem] = useState([]);
  useEffect(() => {
    const getApi = `https://yshuynh.pythonanywhere.com/api/user/orders/${id}`;
    axios
      .get(getApi, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem(storageUser.TOKEN)}`,
        },
      })
      .then((response) => {
        setDetail(response.data);
        console.log(response.data);
      });
  }, []);
  useEffect(() => {
    const getApi = `https://yshuynh.pythonanywhere.com/api/user/orders/${id}`;
    axios
      .get(getApi, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem(storageUser.TOKEN)}`,
        },
      })
      .then((response) => {
        setItem(response.data.items);
        console.log(response.data.items);
      });
  }, []);
  return (
    <div className={styles.col7}>
      <div className={styles.info}>
        <div className={styles.infoName}>
          Tên: <span>{detail.name}</span>{' '}
        </div>
        <div className={styles.infoAddress}>
          Địa chỉ: <span>{detail.address}</span>
        </div>
        <div className={styles.infoPhone}>
          Điện thoại: <span>{detail.phone_number}</span>
        </div>
        {/* <div className={styles.infoPayment}>{detail.payment.name}</div> */}
      </div>
      <div className={styles.listItem}>
        <div className={styles.headerSub}>Đơn hàng số: {detail.id}</div>
        <div className={styles.listItems}>
          {item.map((item) => (
            <div className={styles.item}>
              <div className={styles.itemInfo}>
                <img src={item.product.thumbnail} alt="" />
                <div>
                  <div className={styles.itemName}>{item.product.name}</div>
                  <div className={styles.itemQuantity}>
                    x <span>{item.count}</span>
                  </div>
                </div>
              </div>
              <div className={styles.itemPrice}>
                {' '}
                {formatCash(`${item.order_price}`)} đ
              </div>
            </div>
          ))}
          <div className={styles.shipping}>
            <div>Phí ship</div>
            <span>{formatCash(`${detail.shipping_fee}`)} đ</span>
          </div>
          <div className={styles.totalPrice}>
            <div>Tổng cộng</div>
            <span> {formatCash(`${detail.total_cost}`)} đ</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoOrder;
