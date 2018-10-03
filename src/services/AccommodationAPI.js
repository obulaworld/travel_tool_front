import axios from 'axios';
import {resolveBaseUrl} from '.';

const baseUrl = resolveBaseUrl();

class AccommodationAPI {
  static getAccommodationCentres() {
    return axios.get(`${baseUrl}/guesthouses`);
  }
}

export default AccommodationAPI;
