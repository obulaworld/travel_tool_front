import axios from 'axios';

const testUrl = 'http://127.0.0.1:5000/api/v1';
const baseUrl =
  process.env.NODE_ENV === 'test' ? testUrl : process.env.REACT_APP_API_URL;

class RoleAPI {
  static getRoleUsers(roleId) {
    return axios.get(`${baseUrl}/user/roles/${roleId}`);
  }
}
export default RoleAPI;
