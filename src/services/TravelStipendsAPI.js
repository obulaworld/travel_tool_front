import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();
class TravelStipendsAPI {
  
  static postTravelStipend(requestData) {
    return axios.post(`${baseUrl}/travelStipend`, requestData);
  }
  static getAllTravelStipends = () =>
    axios.get(`${baseUrl}/travelStipend`);
}

export default TravelStipendsAPI;

