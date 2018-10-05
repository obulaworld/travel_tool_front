import axios from 'axios';
import { resolveBaseUrl } from '.';
import rooms from './mockData';

const baseUrl = resolveBaseUrl();

class AccomodationApi {
  static fetchTimelineData(guestHouseId, startDate, endDate) {
    const queryObj = { startDate, endDate };
    const queryString = Object.keys(queryObj)
      .map(key => `${key}=${encodeURIComponent(queryObj[key])}`)
      .join('&');
    return axios.get(`${baseUrl}/guesthouses/${guestHouseId}?${queryString}`);
    // return new Promise((res, rej) => {
    //   setTimeout(() => {
    //     res({data: {
    //       guestHouse: {
    //         rooms: []
    //       }
    //     }});
    //   }, 1000);
    // });
  }
}

export default AccomodationApi;
