import React from 'react';
import { useState } from 'react';
import styles from './Register.module.css';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import { InputAdornment, IconButton, Typography } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useHistory } from 'react-router';
import Grow from '@material-ui/core/Grow';
const LoginForm = () => {
  let history = useHistory();

  const [email, setEmail] = useState('');

  const [passWord, setPassWord] = useState('');

  const [firstName, setFirstName] = useState('');

  const [lastName, setLastName] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleChangeEmail = (event) => setEmail(event.target.value);

  const handleChangePass = (event) => setPassWord(event.target.value);

  const handleChangeFirstName = (event) => setFirstName(event.target.value);
  const handleChangeLastName = (event) => setLastName(event.target.value);

  const Onclick_Switch = () => history.push('/login');
  return (
    <div>
      <div className={styles.body}>
        <Grow in timeout={1500}>
          <div className={styles.col3}>
            <img
              className={styles.logo}
              src="https://blog-consumer.glassdoor.com/app/uploads/sites/2/illustration-find-a-job-youl-love.svg"
              alt=""
            />
            <h3>Hi, Welcome Back</h3>
            <img
              src="https://eshop.harleys.co.ke/login/svg/login-image.svg"
              alt=""
            />
          </div>
        </Grow>
        <Grow in timeout={1500}>
          <div className={styles.col7}>
            <Typography component={'span'} className={styles.headerCol7}>
              Already have acccount?{' '}
              <span onClick={Onclick_Switch} className={styles.btn_switch}>
                Login
              </span>
            </Typography>
            <div className={styles.signInForm}>
              <div className={styles.titles}>
                <div className={styles.titleForm}>
                  Get start absolutely free
                </div>
                <div className={styles.subTitleForm}>
                  Free forever. No credit card needed
                </div>
              </div>
              <ValidatorForm className={styles.nameBox}>
                <TextValidator
                  fullWidth
                  autoComplete="username"
                  type="text"
                  name="text"
                  autoComplete="off"
                  label="First Name"
                  variant="outlined"
                  value={firstName}
                  onChange={handleChangeFirstName}
                  validators={['required']}
                  errorMessages={['TextBox is required', 'Không được để trống']}
                  className={styles.nameField}
                />
                <TextValidator
                  fullWidth
                  autoComplete="username"
                  type="text"
                  name="text"
                  label="Last Name"
                  autoComplete="off"
                  value={lastName}
                  variant="outlined"
                  onChange={handleChangeLastName}
                  validators={['required']}
                  errorMessages={['TextBox is required', 'Không được để trống']}
                  className={styles.nameField1}
                />
              </ValidatorForm>
              <ValidatorForm className={styles.FormControl}>
                <TextValidator
                  fullWidth
                  autoComplete="username"
                  onChange={handleChangeEmail}
                  type="Email"
                  label="Email address"
                  variant="outlined"
                  name="email"
                  autoComplete="off"
                  value={email}
                  validators={['required', 'isEmail']}
                  errorMessages={[
                    'Email is required',
                    'Email must be a valid email address',
                  ]}
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
                  value={passWord}
                  className={styles.textField1}
                  validators={['required', 'minStringLength:8']}
                  errorMessages={[
                    'PassWord is required',
                    'Must enter 8 characters',
                  ]}
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

                <Button
                  className={styles.btn_login}
                  variant="contained"
                  color="primary"
                >
                  Register
                </Button>
              </ValidatorForm>
            </div>
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
        </Grow>
      </div>
    </div>
  );
};

export default LoginForm;
