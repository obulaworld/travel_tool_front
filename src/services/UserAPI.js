import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class UserAPI {
  static postNewUsers(userData) {
    return axios.post(`${baseUrl}/user`, userData);
  }

  static getUserData(id) {
    return axios.get(`${baseUrl}/user/${id}`);
  }
}

export default UserAPI;
