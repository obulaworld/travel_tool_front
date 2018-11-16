import axios from 'axios';
import {resolveBaseUrl} from '.';

const baseUrl = resolveBaseUrl();

class MaintainaceApi {
  static addMaintainanceRecord(data, roomId) {
    return axios.post(`${baseUrl}/room/${roomId}/maintainance`, data);
  }
}

export default MaintainaceApi;
