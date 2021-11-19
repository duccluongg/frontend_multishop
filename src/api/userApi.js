import axiosClient from './axiosClient';
import URL from '../constants/api';
import storageUser from '../constants/storageUser';
function login(data) {
  return axiosClient.post(URL.LoginUrl, data);
}
function UserApi(data) {
  return axiosClient.get(
    URL.UserInfo,
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem(storageUser.TOKEN)}`,
      },
    },
    data
  );
}
// eslint-disable-next-line import/no-anonymous-default-export
export default { login, UserApi };
