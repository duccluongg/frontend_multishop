import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  initialCart,
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from './cartSlice';
import './Cart.css';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/header/header';
import formatCash from '../../constants/formatPrice';
import axios from 'axios';
import storageUser from '../../constants/storageUser';
import PulseLoader from 'react-spinners/PulseLoader';
import { useHistory } from 'react-router';
const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const history = useHistory();
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [idCart, setIdCart] = useState('');
  const toCheckOut = () => {
    history.push('/checkout');
  };
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
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
    dispatch(getTotals());
  }, [cart, dispatch]);
  useEffect(() => {
    const getCart = `https://yshuynh.pythonanywhere.com/api/user/carts`;
    axios
      .get(getCart, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem(storageUser.TOKEN)}`,
        },
      })
      .then((response) => {
        setIdCart(
          response.data.map((item) => {
            return String(item?.id);
          })
        );
        if (response.data) {
          dispatch(initialCart(response.data));
        }
      });
  }, [dispatch]);
  const handleAddToCart = (product) => {
    const getCart = `https://yshuynh.pythonanywhere.com/api/user/carts/add`;
    axios
      .put(
        getCart,
        {
          product: product.id,
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
        if (response.data) {
          dispatch(addToCart(product));
        }
      });
  };
  const handleDecreaseCart = (product) => {
    const getCart = `https://yshuynh.pythonanywhere.com/api/user/carts/remove`;
    axios
      .put(
        getCart,
        {
          product: product.id,
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
        if (response.data) {
          dispatch(decreaseCart(product));
        }
      });
  };
  const handleRemoveFromCart = (product) => {
    // const removeCart = `https://yshuynh.pythonanywhere.com/api/user/carts/remove`;
    // axios
    //   .delete(
    //     removeCart,
    //     {
    //       cart_id: cart.id,
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${sessionStorage.getItem(
    //           storageUser.TOKEN
    //         )}`,
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     console.log(response.data);
    //     if (response.data) {
    //       dispatch(removeFromCart(product));
    //     }
    //   });
  };
  const handleClearCart = () => {
    const getCart = `https://yshuynh.pythonanywhere.com/api/user/carts`;
    axios
      .delete(getCart, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem(storageUser.TOKEN)}`,
        },
        data: idCart,
      })
      .then((response) => {
        console.log(response.data);
      });
    dispatch(clearCart());
  };
  return (
    <React.Fragment>
      <Header />
      {loading ? (
        <div className="sweetLoading">
          <PulseLoader loading={loading} size={10} />
        </div>
      ) : (
        <React.Fragment>
          <div className="cart-container">
            {user?.id ? (
              <React.Fragment>
                <h2>
                  Gi??? h??ng{' '}
                  <span className="subTitle">{`(${cart.cartItems.length} s???n ph???m) `}</span>{' '}
                </h2>
                {cart.cartItems.length === 0 ? (
                  <div className="cart-empty">
                    <img
                      src="https://rtworkspace.com/wp-content/plugins/rtworkspace-ecommerce-wp-plugin/assets/img/empty-cart.png"
                      alt="emtycart"
                    />
                    <div className="start-shopping">
                      <Link to="/">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          className="bi bi-arrow-left"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                          />
                        </svg>
                        <span>Start Shopping</span>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="titles">
                      <h3 className="product-title">Product</h3>
                      <h3 className="price">Price</h3>
                      <h3 className="quantity">Quantity</h3>
                      <h3 className="total">Total</h3>
                    </div>
                    <div className="cart-items">
                      {cart.cartItems &&
                        cart.cartItems.map((cartItem) => (
                          <div className="cart-item" key={cartItem.id}>
                            <div className="cart-product">
                              <img
                                src={cartItem.thumbnail}
                                alt={cartItem.name}
                              />
                              <div className="boxName">
                                <h3 className="itemName">{cartItem.name}</h3>
                                <p>{cartItem.desc}</p>
                                <button
                                  onClick={() => handleRemoveFromCart(cartItem)}
                                >
                                  X??a
                                </button>
                              </div>
                            </div>
                            <div className="cart-product-price">
                              {formatCash(`${cartItem.price}`)} ??
                            </div>
                            <div className="cart-product-quantity">
                              <button
                                onClick={() => handleDecreaseCart(cartItem)}
                              >
                                -
                              </button>
                              <div className="count">
                                {cartItem.cartQuantity}
                              </div>
                              <button onClick={() => handleAddToCart(cartItem)}>
                                +
                              </button>
                            </div>
                            <div className="cart-product-total-price">
                              {formatCash(
                                `${cartItem.price * cartItem.cartQuantity}`
                              )}{' '}
                              ??
                            </div>
                          </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                      <button
                        className="clear-btn"
                        onClick={() => handleClearCart()}
                      >
                        X??a t???t c???
                      </button>
                      <div className="cart-checkout">
                        <div className="subtotal">
                          <span>Th??nh ti???n</span>
                          <span className="amount">
                            {formatCash(`${cart.cartTotalAmount}`)} ??
                          </span>
                        </div>
                        <div className="btn">
                          <button onClick={toCheckOut} className="button">
                            Thanh to??n ngay
                          </button>
                        </div>
                        <div className="continue-shopping">
                          <Link to="/">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="currentColor"
                              className="bi bi-arrow-left"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fillRule="evenodd"
                                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                              />
                            </svg>
                            <span>Ti???p t???c mua h??ng</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ) : (
              <div className="needToLogin">
                <div className="needToLoginName">
                  B???n c???n ????ng nh???p ????? xem gi??? h??ng
                </div>
                <img
                  src="https://rtworkspace.com/wp-content/plugins/rtworkspace-ecommerce-wp-plugin/assets/img/empty-cart.png"
                  alt="emtycart"
                />
              </div>
            )}
          </div>
        </React.Fragment>
      )}
      <Footer />
    </React.Fragment>
  );
};

export default Cart;
