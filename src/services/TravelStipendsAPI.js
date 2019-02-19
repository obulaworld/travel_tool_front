import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();
class TravelStipendsAPI {

  static getAllTravelStipends = () =>
    axios.get(`${baseUrl}/travelStipend`);
}

export default TravelStipendsAPI;
