import axiosClient from './axiosClient';
import URL from '../constants/api';

function getCategory(data) {
  return axiosClient.get(URL.Category + `/${data}`);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getCategory };
