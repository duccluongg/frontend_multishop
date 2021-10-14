import axiosClient from './axiosClient';
import URL from '../constants/api';

function login(data) {
  return axiosClient.post(URL.LoginUrl, data);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { login };
