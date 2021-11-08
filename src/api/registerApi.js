import axiosClient from './axiosClient';
import URL from '../constants/api';

function Register(data) {
  return axiosClient.post(URL.RegisterUrl, data);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { Register };
