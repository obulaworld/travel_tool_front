import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class ApprovalsApi {
  static getUserApprovals(query) {
    return axios.get(`${baseUrl}/approvals${query}`);
  }
}

export default ApprovalsApi;
