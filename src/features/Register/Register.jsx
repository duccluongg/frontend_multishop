import React, { useEffect } from 'react';
import { useState } from 'react';
import styles from './Register.module.css';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { InputAdornment, IconButton, Typography } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useHistory } from 'react-router';
import Grow from '@material-ui/core/Grow';
import Header from '../../components/header/header';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser, registerSelector, clearState } from './registerSlice';
import { showSnackbar } from '../../components/CustomSnackBar/snackBarSlide';
import { SNACK_BAR_TYPE } from '../../constants/snackBarType';
import CustomSnackBar from '../../components/CustomSnackBar/CustomSnackBar';
const LoginForm = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');

  const [passWord, setPassWord] = useState('');

  const [userName, setUserName] = useState('');

  const [name, setName] = useState('');

  const [address, setAddress] = useState('');

  const [phone, setPhone] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleChangeEmail = (event) => setEmail(event.target.value);

  const handleChangePass = (event) => setPassWord(event.target.value);

  const handleChangeUserName = (event) => setUserName(event.target.value);

  const handleChangeName = (event) => setName(event.target.value);

  const handleChangeAddress = (event) => setAddress(event.target.value);

  const handleChangePhone = (event) => setPhone(event.target.value);

  const Onclick_Switch = () => history.push('/login');

  const { isSuccess, isError, errorMessage } = useSelector(registerSelector);
  const onSubmit = () => {
    dispatch(registerUser({ userName, passWord, email, address, name, phone }));
    console.log({ userName, passWord, email, address, name, phone });
  };
  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);
  useEffect(() => {
    if (isError) {
      dispatch(
        showSnackbar({ type: SNACK_BAR_TYPE.ERROR, message: errorMessage })
      );
      dispatch(clearState());
    }
    if (isSuccess) {
      dispatch(clearState());
      dispatch(
        showSnackbar({
          type: SNACK_BAR_TYPE.SUCCESS,
          message: 'đăng kí thành công',
        })
      );
      setTimeout(history.push('/login'), 1000);
    }
  }, [isError, isSuccess]);
  return (
    <div>
      <Header />
      <div className={styles.body}>
        <CustomSnackBar />
        <Grow in timeout={1500}>
          <div className={styles.col7}>
            <div className={styles.signInForm}>
              <div className={styles.titles}>
                <div className={styles.titleForm}>Đăng kí</div>
              </div>
              <ValidatorForm className={styles.FormControl} onSubmit={onSubmit}>
                <div className={styles.name}>
                  Tài khoản <span className={styles.required}>*</span>
                </div>
                <TextValidator
                  fullWidth
                  type="text"
                  name="text"
                  variant="filled"
                  autoComplete="off"
                  label="Nhập tài khoản"
                  value={userName}
                  onChange={handleChangeUserName}
                  className={styles.textField}
                  size="small"
                  validators={['required']}
                  errorMessages={['Nhập tên tài khoản', 'Không được để trống']}
                />
                <div className={styles.name}>
                  mật khẩu <span className={styles.required}>*</span>
                </div>
                <TextValidator
                  fullWidth
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  variant="filled"
                  autoComplete="current-password"
                  label="Nhập mật khẩu"
                  value={passWord}
                  onChange={handleChangePass}
                  className={styles.textField}
                  size="small"
                  validators={['required', 'minStringLength:3']}
                  errorMessages={['Nhập mật khẩu', 'Must enter 3 characters']}
                  InputProps={{
                    // <-- This is where the toggle button is added.
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <div className={styles.name}>
                  email <span className={styles.required}>*</span>
                </div>
                <TextValidator
                  fullWidth
                  name="email"
                  type="Email"
                  variant="filled"
                  label="Nhập email"
                  autoComplete="off"
                  value={email}
                  onChange={handleChangeEmail}
                  size="small"
                  validators={['required', 'isEmail']}
                  className={styles.textField}
                  errorMessages={[
                    'Nhập Email',
                    'Email must be a valid email address',
                  ]}
                />
                <div className={styles.name}>
                  Họ và tên <span className={styles.required}>*</span>
                </div>
                <TextValidator
                  fullWidth
                  type="Text"
                  label="Nhập tên"
                  name="name"
                  variant="filled"
                  autoComplete="off"
                  value={name}
                  onChange={handleChangeName}
                  size="small"
                  validators={['required']}
                  errorMessages={['Nhập tên', 'Không được để trống']}
                  className={styles.textField}
                />
                <div className={styles.name}>
                  Địa chỉ <span className={styles.required}>*</span>
                </div>
                <TextValidator
                  fullWidth
                  onChange={handleChangeAddress}
                  type="Text"
                  label="Nhập địa chỉ"
                  variant="filled"
                  name="address"
                  autoComplete="off"
                  value={address}
                  size="small"
                  validators={['required']}
                  errorMessages={['Nhập địa chỉ', 'Không được để trống']}
                  className={styles.textField}
                />
                <div className={styles.name}>
                  Số điện thoại <span className={styles.required}>*</span>
                </div>
                <TextValidator
                  fullWidth
                  onChange={handleChangePhone}
                  type="Text"
                  variant="filled"
                  label="Nhập Số điện thoại"
                  name="phone"
                  autoComplete="off"
                  value={phone}
                  size="small"
                  validators={['required']}
                  errorMessages={['Nhập số điện thoại', 'Không được để trống']}
                  className={styles.textField}
                />
                <div className={styles.btn}>
                  <button type="submit" className={styles.button}>
                    Đăng kí
                  </button>
                </div>
              </ValidatorForm>
              <Typography component={'div'} className={styles.headerCol7}>
                Already have acccount?{' '}
                <span onClick={Onclick_Switch} className={styles.btn_switch}>
                  Login
                </span>
              </Typography>
              <div className={styles.or}>
                <span className={styles.titleOr}>Contact us at</span>
              </div>
              <div className={styles.loginByAPP}>
                <button className={styles.google}>
                  <i className="fab fa-google"></i>
                </button>
                <button className={styles.facebook}>
                  <i className="fab fa-facebook-f"></i>
                </button>
                <button className={styles.twiter}>
                  <i className="fab fa-twitter"></i>
                </button>
              </div>
            </div>
          </div>
        </Grow>
      </div>
    </div>
  );
};

export default LoginForm;
