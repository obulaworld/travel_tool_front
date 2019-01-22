import axios from 'axios';
import {resolveBaseUrl} from '.';

const baseUrl = resolveBaseUrl();

export default class emailReminderAPI  {
  static getEmailReminders(query) {
    const config = {};
    if( query ){
      config['params'] = query;
    }
    return axios.get(`${baseUrl}/reminders`,config);
  }
  static disableEmailReminderCondition({conditionId, reason}) {
    return axios.put(`${baseUrl}/reminders/conditions/disable/${conditionId}`, {
      reason: reason.disableReason
    });
  }
}
