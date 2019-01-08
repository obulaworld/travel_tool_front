import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();
const query = {
};

class ReadinessAPI {
  static getTravelReadiness(query) {
    return axios.get(
      `${baseUrl}/analytics/readiness?page=${query.page}&limit=${query.limit}&type=${query.type}&travelFlow=${query.travelFlow}`
    );
  }

  static exportTravelReadiness(query) {
    return axios.get(
      `${baseUrl}/analytics/readiness?type=${query.type}&travelFlow=${query.travelFlow}`,
      {responseType: 'blob'}
    );
  }

  static createDocument(documentType, documentDetails) {
    return axios.post(
      `${baseUrl}/travelreadiness`,
      {
        [documentType]: documentDetails
      }
    );
  }
}

export default ReadinessAPI;
