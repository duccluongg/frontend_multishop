import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../Order.module.css';
import storageUser from '../../../constants/storageUser';
import formatCash from '../../../constants/formatPrice';
import { useHistory } from 'react-router';
const ListOrder = () => {
  const history = useHistory();
  const [order, setOrder] = useState([]);
  useEffect(() => {
    const getApi = `https://yshuynh.pythonanywhere.com/api/user/orders?page=1&page_size=5`;
    axios
      .get(getApi, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem(storageUser.TOKEN)}`,
        },
      })
      .then((response) => {
        setOrder(response.data.results);
      });
  }, []);
  console.log(order);
  const switchCase = (props) => {
    switch (props) {
      case 'waiting_confirm':
        return <div className={styles.needConfimed}>Đang chờ xác thực</div>;
      case 'confirmed':
        return <div className={styles.confimed}>Đã xác nhận</div>;
      case 'shipping':
        return <div className={styles.Shipping}>Đang vận chuyển</div>;
      case 'success':
        return <div className={styles.success}>Giao hàng thành công</div>;
      default:
        return <div></div>;
    }
  };
  return (
    <div className={styles.col7}>
      {order.map((item) => (
        <div key={item.id} className={styles.itemOrder}>
          <div className={styles.row1}>
            <div className={styles.brandName}>Multishop</div>
            <div className={styles.status}>{switchCase(item.status)}</div>
          </div>
          <div className={styles.row2}>
            <div className={styles.left}>
              <div className={styles.info}>
                <div className={styles.idCard}>Đơn hàng số: {item.id}</div>
                <div className={styles.itemName}>{item.name}</div>
                <div className={styles.phoneUser}>{item.phone_number}</div>
                <div className={styles.payment}>{item.payment.name}</div>
                <div
                  className={styles.details}
                  onClick={() => {
                    history.push(`/detailOrder/${item.id}`);
                  }}
                >
                  Xem chi tiết đơn hàng
                </div>
              </div>
              <div className={styles.listImg}>
                {item.items.map((items) => (
                  <img key={items.id} src={items.product.thumbnail} alt="" />
                ))}
              </div>
            </div>
            <div className={styles.priceBox}>
              <div className={styles.price}>
                {formatCash(item.sum_price.toString())} đ
              </div>
            </div>
          </div>
          <div className={styles.row3}>
            <div className={styles.shipping}>
              {' '}
              Phí ship:{' '}
              <span>{formatCash(item.shipping_fee.toString())} đ</span>
            </div>
            <div className={styles.totalPrice}>
              Tổng số tiền:{' '}
              <span>{formatCash(item.total_cost.toString())} đ</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListOrder;
