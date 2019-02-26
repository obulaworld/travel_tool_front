import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();
class TravelStipendsAPI {
  
  static postTravelStipend(requestData) {
    return axios.post(`${baseUrl}/travelStipend`, requestData);
  }
  static getAllTravelStipends = () =>
    axios.get(`${baseUrl}/travelStipend`);

  static deleteTravelStipend = (stipendId) => {
    return axios.delete(`${baseUrl}/travelStipend/${stipendId}`);
  }

}

export default TravelStipendsAPI;

