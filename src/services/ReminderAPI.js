import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class ReminderAPI{
  static createReminder(payload) {
    return axios.post(`${baseUrl}/reminders`, payload);
  }
}

export default ReminderAPI;
