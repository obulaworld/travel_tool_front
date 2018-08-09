import Cookie from 'cookies-js';
import jwtDecode from 'jwt-decode';
import authenticationMessage from './toast';

export const userDetails = ()  => {
  const cookie = Cookie.get('jwt-token');
  const authChecker = cookie ? true : false;
  const decodeToken = cookie ? jwtDecode(Cookie.get('jwt-token')) : null;
  const data = {
    isAuthenticated: authChecker,
    user: decodeToken
  };
  return data;
};

export const loginStatus = () => {
  if (!Cookie.get('login-status')) {
    Cookie.set('login-status', 'true');
    authenticationMessage();
  }
};
