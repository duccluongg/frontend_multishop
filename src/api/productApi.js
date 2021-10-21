import axiosClient from './axiosClient';
import URL from '../constants/api';

function getProductCategory(data) {
  return axiosClient.get(URL.ProductCategory + `=${data}`);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getProductCategory };
