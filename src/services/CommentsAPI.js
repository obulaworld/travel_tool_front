import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class CommentsAPI {
  static createComment(commentData) {
    return axios.post(`${baseUrl}/comments`, commentData);
  }
}

export default CommentsAPI;
