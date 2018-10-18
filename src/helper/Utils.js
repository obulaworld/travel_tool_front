import { isEmpty } from 'lodash';
import moment from 'moment';

class Utils {

  static getRegex(query) {
    let regex = new RegExp(`${query}=[0-9]+`);
    if (query === 'search') {
      regex = new RegExp(`${query}=([^&]*)`);
    }
    return regex;
  }

  static removeQueryParam(queryString, query) {
    const regex = new RegExp(`([&]*)${query}=([^&]*)`);
    let newQueryString = queryString.replace(regex, '');
    newQueryString = newQueryString.replace(/(.+)(&)$/, '$1');
    return newQueryString;
  }

  static createQuery(queryString, queryparams, regex) {
    let newQueryString = `?${queryparams}`;
    if (queryString.length && queryString.search(regex) === -1) {
      newQueryString = `${queryString}&${queryparams}`;
    } else if (queryString.length && queryString.search(regex) > -1) {
      newQueryString = queryString.replace(regex, queryparams);
    }
    return newQueryString;
  }

  static buildQuery(queryString, query, queryValue) {
    const regex = Utils.getRegex(query);
    const queryparams = (queryValue) ? `${query}=${queryValue}` : '';
    let newQueryString = Utils.createQuery(queryString, queryparams, regex);
    newQueryString = (query === 'search')
      ? Utils.removeQueryParam(newQueryString, 'page') : newQueryString;
    newQueryString = newQueryString.replace(/(.+)(&)$/, '$1');
    return newQueryString;
  }

  static getActiveStatus(query) {
    let activeStatus;
    const regex = /status=[A-Z]+/i;
    const allActive = query.search(regex);
    if (allActive === -1) {
      activeStatus = 'all';
    } else {
      activeStatus = regex.exec(query)[0].split('=')[1];
    }
    return activeStatus;
  }

  static getCurrentLimit(query) {
    const regex = /limit=\d+/;
    const limit = regex.exec(query) === null ? ''
      : regex.exec(query)[0].split('=')[1];
    return limit;
  }

  static getQueryValue(queryString, key) {
    const regex = Utils.getRegex(key);
    const value = regex.exec(queryString) === null ? ''
      : regex.exec(queryString)[0].split('=')[1];
    return value;
  }

  static formatWord(word, criteria) {
    const formattedWord = `${word}${criteria > 1 ? 's' : ''}`;
    return formattedWord;
  }

  static updateTrips(trips, updatedTrip) {
    let newTripsRecord = trips
      .filter((tripObject) => (tripObject.id !== updatedTrip.id));
    let tripToUpdate = trips
      .find((tripObject) => (tripObject.id === updatedTrip.id));
    if (tripToUpdate) {
      tripToUpdate = { ...tripToUpdate, ...updatedTrip };
      newTripsRecord.push(tripToUpdate);
    }
    return newTripsRecord;
  }

  static generateTripRoomName(trip) {
    let tripRoomName = '';
    if (trip.beds.bedName && trip.beds.rooms && trip.beds.rooms.roomName
      && trip.beds.rooms.guestHouses.houseName) {
      tripRoomName = `${trip.beds.rooms.guestHouses.houseName}, ${trip.beds.rooms.roomName}, 
      ${trip.beds.bedName}`;
    }
    return tripRoomName;
  }

  static generateTripDuration({departureDate, returnDate}) {
    let endDay = '';
    let endMonth = '';
    let endYear = '';
    let startDay = moment(departureDate).format('Do');
    const startMonth = moment(departureDate).format('MMM');
    const startYear = moment(departureDate).format('YYYY');
    if (returnDate) {
      endDay = moment(returnDate).format('Do');
      endMonth = moment(returnDate).format('MMM');
      endYear = moment(returnDate).format('YYYY');
      if (startMonth !== endMonth) startDay += ` ${startMonth}`;
      return `${startDay} - ${endDay} ${endMonth} ${endYear}`;
    }
    return `${startDay} ${startMonth} ${startYear}`;
  }
  static toCamelCase = (str) => {
    return str.split(' ').map(function(word,index){
      if(index == 0){
        return word.toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join('');
  }
}

export default Utils;

