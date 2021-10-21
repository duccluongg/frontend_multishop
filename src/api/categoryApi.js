import axiosClient from './axiosClient';
import URL from '../constants/api';

function getCategories(data) {
  return axiosClient.get(URL.Categories + `/${data}`);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getCategories };
