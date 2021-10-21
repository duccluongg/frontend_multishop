import React from 'react';
import { useState, useEffect } from 'react';
import styles from './LoginForm.module.css';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
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

const LoginForm = () => {
  let history = useHistory();

  const [email, setEmail] = useState('');

  const dispatch = useDispatch();

  const { isSuccess, errorMessage, isError } = useSelector(authSelector);

  const [password, setPassWord] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const [remember, setRemember] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const Onclick_Switch = () => history.push('/register');

  const handleChangeEmail = (event) => setEmail(event.target.value);

  const handleChangePass = (event) => setPassWord(event.target.value);

  const handleSubmit = () => {
    dispatch(userLogin({ email, password, remember }));
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
      <Grid className={styles.body}>
        <CustomSnackBar />
        <Grow in timeout={1500}>
          <Grid className={styles.col3}>
            <img
              className={styles.logo}
              src="https://blog-consumer.glassdoor.com/app/uploads/sites/2/illustration-find-a-job-youl-love.svg"
              alt=""
            />
            <h3>Hi, Welcome Back</h3>
            {/* <img
              src="https://eshop.harleys.co.ke/login/svg/login-image.svg"
              alt=""
            /> */}
          </Grid>
        </Grow>
        <Grow in timeout={1500}>
          <Grid className={styles.col7}>
            <Grid className={styles.headerCol7}>
              Don’t have an account?{' '}
              <span onClick={Onclick_Switch} className={styles.btn_switch}>
                Get started
              </span>
            </Grid>
            <Grid className={styles.signInForm}>
              <Grid className={styles.titles}>
                <Grid className={styles.titleForm}>Sign in to Minimal</Grid>
                <Grid className={styles.subTitleForm}>
                  Enter your details below
                </Grid>
              </Grid>
              <ValidatorForm
                className={styles.FormControl}
                onSubmit={handleSubmit}
              >
                <TextValidator
                  fullWidth
                  autoComplete="username"
                  onChange={handleChangeEmail}
                  type="text"
                  label="Email address"
                  variant="outlined"
                  name="email"
                  autoComplete="off"
                  // value={email}
                  // validators={['required', 'isEmail']}
                  // errorMessages={[
                  //   'Email is required',
                  //   'Email must be a valid email address',
                  // ]}
                  className={styles.textField}
                />
                <TextValidator
                  fullWidth
                  autoComplete="current-password"
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  name="password"
                  onChange={handleChangePass}
                  variant="outlined"
                  value={password}
                  className={styles.textField1}
                  validators={['required', 'minStringLength:3']}
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
                  className={styles}
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

                <Button
                  className={styles.btn_login}
                  variant="contained"
                  color="primary"
                  type="submit"
                  // onClick={() => {
                  //   console.log(userApi.login({ email, password }))
                  // }}
                >
                  Login
                </Button>
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
  );
};

export default LoginForm;
