import axios from 'axios';

const testUrl = 'http://127.0.0.1:5000/api/v1';
const baseUrl = process.env.NODE_ENV === 'test' ? testUrl : process.env.REACT_APP_API_URL;

class RequestAPI {
  static getUserRequests(query) {
    // const query = url && url.split('?')[1] || '';
    //console.log('Service query', query);
    return axios.get(`${baseUrl}/requests${query}`);
  }

  static postNewRequest(requestData) {
    return axios.post(`${baseUrl}/requests`, requestData);
  }
}

export default RequestAPI;
