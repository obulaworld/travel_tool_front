import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class DocumentAPI {
  static fetchDocuments(){
    return axios.get(`${baseUrl}/documents`);
  }
}

export default DocumentAPI;
