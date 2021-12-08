import React, { useEffect, useState } from 'react';
import styles from '../Checkout.module.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import formatCash from '../../../constants/formatPrice';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Modal from './modal';
const SlideCheckOut = ({ handleSubmit }) => {
  const [value, setValue] = React.useState(1);
  const [modal, setModal] = useState(false);
  const cart = useSelector((state) => state.cart);
  console.log(cart);

  const [payment, setPayment] = useState([]);
  useEffect(() => {
    const getApi = 'https://yshuynh.pythonanywhere.com/api/payments';
    axios.get(getApi).then((response) => {
      setPayment(response.data);
    });
  }, []);
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const checkoutOrder = () => {};
  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(value, cart);
    setModal(!modal);
  };
  const toggleModal = () => {
    setModal(!modal);
  };
  return (
    <form onSubmit={onSubmit} className={styles.col6}>
      <div className={styles.headerSub}>Đơn hàng</div>
      <div className={styles.listItem}>
        {cart.cartItems.map((item) => (
          <div className={styles.item}>
            <div className={styles.itemInfo}>
              <img src={item.thumbnail} alt="" />
              <div>
                <div className={styles.itemName}>{item.name}</div>
                <div className={styles.itemQuantity}>x {item.cartQuantity}</div>
              </div>
            </div>
            <div className={styles.itemPrice}>
              {' '}
              {formatCash((item.price * item.cartQuantity).toString())} đ
            </div>
          </div>
        ))}
        <div className={styles.totalPrice}>
          <div>Tổng cộng</div>
          <span> {formatCash(cart.cartTotalAmount.toString())} đ</span>
        </div>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="gender"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            {payment.map((item) => (
              <FormControlLabel
                key={item.id}
                value={item.id}
                control={<Radio />}
                label={item.name}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </div>
      <div className={styles.btn}>
        <button onClick={checkoutOrder} className={styles.button}>
          Thanh toán
        </button>
      </div>
      {modal && (
        <div className={styles.modal}>
          <div onClick={toggleModal} className={styles.overLay}>
            <Modal />
          </div>
        </div>
      )}
    </form>
  );
};

export default SlideCheckOut;
