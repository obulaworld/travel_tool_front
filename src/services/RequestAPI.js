import axios from 'axios';

const testUrl = 'http://127.0.0.1:5000/api/v1';
const baseUrl = ['test', 'development'].includes(process.env.NODE_ENV) ? testUrl : process.env.REACT_APP_API_URL;

class RequestAPI {
  static getUserRequests(query) {
    return axios.get(`${baseUrl}/requests${query}`);
  }

  static getUserRequestDetails(requestId) {
    return axios.get(`${baseUrl}/requests/${requestId}`);
  }
  static postNewRequest(requestData) {
    return axios.post(`${baseUrl}/requests`, requestData);
  }
}

export default RequestAPI;
