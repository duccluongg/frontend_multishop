import React, { useEffect, useState } from 'react';
import styles from './header.module.css';
import axios from 'axios';
import NavBar from './components/NavBar/NavBar';
import storageUser from '../../constants/storageUser';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
const Header = () => {
  const history = useHistory();
  const [user, setUser] = useState({});
  const [modal, setModal] = useState(false);
  const [searchList, setSearchList] = useState([]);
  console.log(searchList);
  const handleSearch = (e) => {
    const temp = e.target.value;
    if (temp == '') {
      setSearchList([]);
    } else {
      const getApi = `https://yshuynh.pythonanywhere.com/api/products/lite?page_size=10&search_name=${temp}`;
      axios.get(getApi).then((response) => {
        setSearchList(response.data.results);
      });
    }
  };
  const toggleModal = () => {
    setModal(!modal);
  };
  const showModal = () => {
    setModal(!modal);
  };
  const logout = () => {
    sessionStorage.removeItem(storageUser.TOKEN);
  };
  const { cartTotalQuantity } = useSelector((state) => state.cart);
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

  return (
    <React.Fragment>
      <div className={styles.container}>
        <div>Multishop</div>
        <div className={styles.info}>
          <div onClick={showModal} className={styles.search}>
            <i className="fas fa-search"></i>
          </div>
          {user?.id ? (
            <div className={styles.acc}>
              {user.name}
              <ul className={styles.notifyList}>
                <Link to="/account" className={styles.notifyItem}>
                  Thông tin cá nhân
                </Link>
                <Link to="/order" className={styles.notifyItem}>
                  Lịch sử đơn hàng
                </Link>
                <Link
                  to="/Login"
                  onClick={logout}
                  className={styles.notifyItem}
                >
                  Đăng xuất
                </Link>
              </ul>
            </div>
          ) : (
            <div className={styles.acc}>
              Tài khoản
              <ul className={styles.notifyList}>
                <Link to="/login" className={styles.notifyItem}>
                  Đăng nhập
                </Link>
                <Link to="/register" className={styles.notifyItem}>
                  Đăng ký
                </Link>
              </ul>
            </div>
          )}
          <Link to="/cart" className={styles.cart}>
            Giỏ hàng
            <i className="fas fa-shopping-cart">
              {user?.id ? <span>{cartTotalQuantity}</span> : <span>0</span>}
            </i>
          </Link>
        </div>
      </div>
      <div className={styles.border}></div>
      <NavBar />
      {modal && (
        <div className={styles.modal}>
          <div className={styles.overLay}>
            <div>
              <div className={styles.searchBox}>
                <i className="fas fa-search"></i>
                <input
                  className={styles.searchTxt}
                  type="text"
                  name="productName_contains"
                  placeholder="Type to search"
                  onKeyUp={handleSearch}
                  autoComplete="off"
                />

                <i onClick={toggleModal} className="fas fa-times"></i>
              </div>
              <div className={styles.listSearch}>
                {searchList.map((item) => (
                  <div
                    onClick={() => history.push(`/productDetail/${item.id}`)}
                    key={item.id}
                    className={styles.itemSearch}
                  >
                    <img src={item.thumbnail} alt="thumbnail" />
                    <div className={styles.nameItem}>{item.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Header;
