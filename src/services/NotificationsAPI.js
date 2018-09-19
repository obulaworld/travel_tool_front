import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class NotificationsAPI {
  static getNotifications() {
    return axios.get(`${baseUrl}/notifications`);
  }
}

export default NotificationsAPI;
