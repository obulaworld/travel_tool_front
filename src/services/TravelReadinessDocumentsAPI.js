import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class TravelReadinessDocumentsAPI {
  static getAllUsersReadiness() {
    return axios.get(`${baseUrl}/travelreadiness/users`);
  }

  static getUserReadiness(userId) {
    return axios.get(`${baseUrl}/travelreadiness/users/${userId}`);
  }

  static getTravelReadinessDocument(documentId) {
    return axios.get(`${baseUrl}/travelreadiness/documents/${documentId}`);
  }

  static verifyTravelReadinessDocument(query) {
    return axios.put(`${baseUrl}/travelreadiness/documents/${query}/verify`);
  }

  static editTravelReadinessDocument(documentType, documentDetails, documentId) {
    return axios.put(
      `${baseUrl}/travelreadiness/documents/${documentId}`,
      {
        [documentType]: documentDetails
      }
    );
  }
}

export default TravelReadinessDocumentsAPI;

