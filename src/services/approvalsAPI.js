import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class ApprovalsApi {
  static getUserApprovals(query) {
    return axios.get(`${baseUrl}/approvals${query}`);
  }

  static updateRequestStatus(data) {
    return axios.put(`${baseUrl}/approvals/${data.requestId}`, data);
  }
}

export default ApprovalsApi;
