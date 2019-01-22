import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class ReminderManagementAPI{
  static createEmailReminderTemplate(data) {
    return axios.post( `${baseUrl}/reminderManagement/emailTemplates`,data);
  }
  static getAllEmailTemplates = (parameters) =>
    axios.get(`${baseUrl}/reminderManagement/emailTemplates${parameters}`);
}

export default ReminderManagementAPI;
