import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
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
const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
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

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
  };
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };
  const handleClearCart = () => {
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
                  Giỏ hàng{' '}
                  <span className="subTitle">{`(${cart.cartItems.length} sản phẩm) `}</span>{' '}
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
                                  Xóa
                                </button>
                              </div>
                            </div>
                            <div className="cart-product-price">
                              {formatCash(`${cartItem.price}`)} đ
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
                              đ
                            </div>
                          </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                      <button
                        className="clear-btn"
                        onClick={() => handleClearCart()}
                      >
                        Xóa tất cả
                      </button>
                      <div className="cart-checkout">
                        <div className="subtotal">
                          <span>Thành tiền</span>
                          <span className="amount">
                            {formatCash(`${cart.cartTotalAmount}`)} đ
                          </span>
                        </div>
                        <div className="btn">
                          <button className="button">Thanh toán ngay</button>
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
                            <span>Tiếp tục mua hàng</span>
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
                  Bạn cần đăng nhập để xem giỏ hàng
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
