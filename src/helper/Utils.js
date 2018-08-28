class Utils {
  static addOrReplaceQuery(queryString, query, queryValue) {
    let newQueryString;
    const regex = new RegExp(`${query}=[0-9]+`);
    if(queryString.search(regex) === -1) {
      newQueryString = `${queryString}&${query}=${queryValue}`;
    } else {
      newQueryString = queryString.replace(regex, `${query}=${queryValue}`);
    }
    return newQueryString;
  }
}

export default Utils;

