import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class ApprovalsApi {
  static getUserApprovals(query, budgetChecker) {
    return axios.get(`${baseUrl}/approvals${budgetChecker ? '/budget': ''}${query}`);
  }

  static updateRequestStatus(data) {
    let url = `${baseUrl}/approvals/${data.requestId}`;
    if (data.newStatus === 'Verified') {
      url = `${baseUrl}/requests/${data.requestId}/verify`;
    }
    return axios.put(url, data);
  }
}

export default ApprovalsApi;
