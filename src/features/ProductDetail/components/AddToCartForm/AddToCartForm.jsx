import PropTypes from 'prop-types';
import React from 'react';
import styles from './AddToCartForm.module.css';
AddToCartForm.propTypes = {
  onSubmit: PropTypes.func,
};

function AddToCartForm() {
  return (
    <form>
      <div className={styles.title}>Số lượng</div>
      <button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        className={styles.btn_cart}
      >
        <i className="fas fa-shopping-cart"></i>
        Thêm vào giỏ hàng
      </button>
    </form>
  );
}

export default AddToCartForm;
