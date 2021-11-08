import React from 'react';
import { useState, useEffect } from 'react';
import styles from './LoginForm.module.css';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Checkbox from '@material-ui/core/Checkbox';
import Grow from '@material-ui/core/Grow';
import {
  InputAdornment,
  IconButton,
  Grid,
  Typography,
  Box,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, userLogin } from '../authSlice';
import { SNACK_BAR_TYPE } from '../../../../constants/snackBarType';
import { showSnackbar } from '../../../../components/CustomSnackBar/snackBarSlide';
import { clearState } from '../authSlice';
import CustomSnackBar from '../../../../components/CustomSnackBar/CustomSnackBar';
import Header from '../../../../components/header/header';
import storageUser from '../../../../constants/storageUser';
const LoginForm = () => {
  let history = useHistory();

  const [username, setUserName] = useState('');

  const dispatch = useDispatch();

  const { isSuccess, errorMessage, isError } = useSelector(authSelector);

  const [password, setPassWord] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const [remember, setRemember] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const Onclick_Switch = () => history.push('/register');

  const handleChangeEmail = (event) => setUserName(event.target.value);

  const handleChangePass = (event) => setPassWord(event.target.value);

  const handleSubmit = () => {
    dispatch(userLogin({ username, password, remember }));
    console.log({ username, password, remember });
  };

  useEffect(() => {
    if (isError) {
      dispatch(
        showSnackbar({ type: SNACK_BAR_TYPE.ERROR, message: errorMessage })
      );
      dispatch(clearState());
    }
    if (isSuccess) {
      dispatch(clearState());
      history.push('/');
    }
  }, [isError, isSuccess]);
  const handleCheckBoxChange = () => {
    setRemember(!remember);
  };

  return (
    <React.Fragment>
      <Header />
      <React.Fragment>
        <Grid className={styles.body}>
          <CustomSnackBar />
          <Grow in timeout={1500}>
            <Grid className={styles.col7}>
              <Grid className={styles.signInForm}>
                <Grid className={styles.titles}>
                  <Grid className={styles.titleForm}>Đăng nhập</Grid>
                </Grid>
                <ValidatorForm
                  className={styles.FormControl}
                  onSubmit={handleSubmit}
                >
                  <div className={styles.name}>
                    Tài khoản <span className={styles.required}>*</span>
                  </div>
                  <TextValidator
                    fullWidth
                    onChange={handleChangeEmail}
                    type="text"
                    label="Nhập tài khoản"
                    variant="filled"
                    name="username"
                    autoComplete="off"
                    value={username}
                    // validators={['required', 'isEmail']}
                    // errorMessages={[
                    //   'Email is required',
                    //   'Email must be a valid email address',
                    // ]}
                    size="small"
                    className={styles.textField}
                  />
                  <div className={styles.name}>
                    Mật khẩu <span className={styles.required}>*</span>
                  </div>
                  <TextValidator
                    fullWidth
                    autoComplete="current-password"
                    type={showPassword ? 'text' : 'password'}
                    label="Nhập mật khẩu"
                    variant="filled"
                    name="password"
                    onChange={handleChangePass}
                    value={password}
                    className={styles.textField}
                    size="small"
                    validators={['required', 'minStringLength:2']}
                    errorMessages={[
                      'PassWord is required',
                      'Must enter 8 characters',
                    ]}
                    InputProps={{
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
                  <Grid
                    className={styles.remember}
                    container
                    direction="row"
                    alignItems="center"
                  >
                    <Checkbox
                      checked={remember}
                      onChange={handleCheckBoxChange}
                      color="primary"
                    ></Checkbox>
                    <Typography>
                      <Box
                        fontSize={'1rem'}
                        color={'rgb(33, 43, 54)'}
                        fontWeight={400}
                        fontFamily={"'Public Sans', sans-serif"}
                      >
                        Remember me
                      </Box>
                    </Typography>
                  </Grid>
                  <div className={styles.btn}>
                    <button className={styles.button}>Đăng nhập</button>
                  </div>
                  <button
                    className={styles.btn_login}
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={() => localStorage.removeItem(storageUser.TOKEN)}
                  >
                    xoas local
                  </button>
                  <button
                    className={styles.btn_login}
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={() => sessionStorage.removeItem(storageUser.TOKEN)}
                  >
                    xoas sess
                  </button>
                  <Grid className={styles.headerCol7}>
                    Bạn chưa có tài khoản ? Đăng kí{' '}
                    <span
                      onClick={Onclick_Switch}
                      className={styles.btn_switch}
                    >
                      Tại đây
                    </span>
                  </Grid>
                </ValidatorForm>
                <Grid className={styles.or}>
                  <span className={styles.titleOr}>Contact us at</span>
                </Grid>
                <Grid className={styles.loginByAPP}>
                  <button className={styles.google}>
                    <i className="fab fa-google"></i>
                  </button>
                  <button className={styles.facebook}>
                    <i className="fab fa-facebook-f"></i>
                  </button>
                  <button className={styles.twitter}>
                    <i className="fab fa-twitter"></i>
                  </button>
                </Grid>
              </Grid>
            </Grid>
          </Grow>
        </Grid>
      </React.Fragment>
    </React.Fragment>
  );
};

export default LoginForm;
