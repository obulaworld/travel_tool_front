import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class TravelReasonsAPI {
  static getAllTravelReasons(query){
    return axios.get(`${baseUrl}/request/reasons${query}`);
  }

  static createTravelReasons(query) {
    return axios.post(`${baseUrl}/request/reasons`, query);
  }

  static viewTravelReasonDetails(id) {
    return axios.get(`${baseUrl}/request/reasons/${id}`);
  }
}

export default TravelReasonsAPI;
