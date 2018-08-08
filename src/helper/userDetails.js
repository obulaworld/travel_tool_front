import Cookie from 'cookies-js';
import jwtDecode from 'jwt-decode';

const userDetails = ()  => {
  const cookie = Cookie.get('jwt-token');
  const authChecker = cookie ? true : false;
  const decodeToken = cookie ? jwtDecode(Cookie.get('jwt-token')) : null;
  const data = {
    isAuthenticated: authChecker,
    user: decodeToken
  };
  return data;
};

export default userDetails;
