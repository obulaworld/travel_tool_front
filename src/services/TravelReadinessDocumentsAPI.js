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
}

export default TravelReadinessDocumentsAPI;

