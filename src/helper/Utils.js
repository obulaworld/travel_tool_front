class Utils {
  /**
   *
   * @param {string} queryString - initial query
   * @param {string} query - query to be included
   * @param {number} queryValue - query value
   *
   * @returns {string} - the new composed query
   */
  static buildQuery(queryString, query, queryValue) {
    let newQueryString;
    const regex = new RegExp(`${query}=[0-9]+`);

    switch(queryString.length) {
    case (0):
      newQueryString = `?${query}=${queryValue}`;
      break;
    default:
      newQueryString = queryString.search(regex) === -1 ?
        `${queryString}&${query}=${queryValue}` :
        queryString.replace(regex, `${query}=${queryValue}`);
      break;
    }
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
}

export default Utils;

