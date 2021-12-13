import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InfoCheckout from './Components/InfoCheckout';
import SlideCheckOut from './Components/SlideCheckOut';
import styles from './Checkout.module.css';
import Header from '../../components/header/header';
import Footer from '../../components/Footer/Footer';
import storageUser from '../../constants/storageUser';
const Checkout = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getApi = `https://yshuynh.pythonanywhere.com/api/user/me`;
    axios
      .get(getApi, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem(storageUser.TOKEN)}`,
        },
      })
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
      });
  }, []);
  console.log(user);

  const checkOut = (value, cart) => {
    const getApi = `https://yshuynh.pythonanywhere.com/api/user/orders`;
    axios
      .post(
        getApi,
        {
          name: user.name,
          address: user.address,
          phone_number: user.phone_number,
          payment: value,
          items: cart?.cartItems?.map((item) => {
            return { product: item?.id, count: item?.cartQuantity };
          }),
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem(
              storageUser.TOKEN
            )}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      });
    console.log(cart);
  };

  return (
    <React.Fragment>
      <Header />
      <div className={styles.container}>
        <InfoCheckout userInfo={user} />
        <SlideCheckOut handleSubmit={checkOut} />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Checkout;
