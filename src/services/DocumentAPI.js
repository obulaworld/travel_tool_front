import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class DocumentAPI {
  static fetchDocuments(){
    return axios.get(`${baseUrl}/documents`);
  }

  static updateDocument(documentId, updatedDocument) {
    return axios.put(`${baseUrl}/documents/${documentId}`, updatedDocument);
  }
}

export default DocumentAPI;
