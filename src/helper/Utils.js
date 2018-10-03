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
}

export default Utils;

