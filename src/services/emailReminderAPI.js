import axios from 'axios';
import {resolveBaseUrl} from '.';

const baseUrl = resolveBaseUrl();

export default class emailReminder  {
  static getEmailReminders(query) {
    const config = {};
    if( query ){
      config['params'] = query;
    }
    return axios.get(`${baseUrl}/reminders`,config);
  }
}
