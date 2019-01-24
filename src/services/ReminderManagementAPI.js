import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class ReminderManagementAPI{
  static createEmailReminderTemplate(data) {
    return axios.post( `${baseUrl}/reminderManagement/emailTemplates`,data);
  }
  static getAllEmailTemplates = (parameters) =>
    axios.get(`${baseUrl}/reminderManagement/emailTemplates${parameters}`);

    static enableEmailTemplates = (templateId) =>
      axios.put(`${baseUrl}/reminderManagement/emailTemplates/enable/${templateId}`);  
}

export default ReminderManagementAPI;
