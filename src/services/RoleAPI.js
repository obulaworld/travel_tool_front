import axios from 'axios';

import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class RoleAPI {
  static putData(roleData) {
    return axios.put(`${baseUrl}/user/role/update`, roleData);
  }

  static getRoleData() {
    return axios.get(`${baseUrl}/user/roles`);
  }

  static getRoleUsers(roleId) {
    return axios.get(`${baseUrl}/user/roles/${roleId}`);
  }
}
export default RoleAPI;
