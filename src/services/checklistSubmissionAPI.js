import axios from 'axios';

import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class SubmissionAPI {
  static postSubmission(submissionData, checkListItemId) {
    return axios.post(`${baseUrl}/checklists/${checkListItemId}/submission`, submissionData);
  }
  static getSubmission(requestId){
    return axios.get(`${baseUrl}/checklists/${requestId}/submission`);
  }
}
export default SubmissionAPI;
