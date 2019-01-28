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
      
    static disableEmailTemplate({templateId, disableReason}) {
      const reason = disableReason.disableReason;
      return axios.put(`${resolveBaseUrl()}/reminderManagement/emailTemplates/disable/${templateId}`, {
        reason
      });
    }
}

export default ReminderManagementAPI;
