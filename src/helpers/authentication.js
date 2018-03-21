import jwtDecode from 'jwt-decode';

/**
 * @name getToken
 * @summary Retrieves token from cookie
 * @return {string} representing token
 */
export const getToken = () => {
  const cookie = document.cookie.split('jwt-token=');
  if (cookie.length > 1) {
    return cookie[1];
  }
  return null;
};

/**
 * @name decodeToken
 * @summary Retrieves user information from token
 * @return {object} representing token information
 */
export const decodeToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    return {};
  }
};

/**
 * @name tokenIsValid
 * @summary Checks that token has not expired and payload has Andelan role
 * @return {boolean} representing token
 */
export const tokenIsValid = (tokenInfo) => {
  try {
    if (tokenInfo.exp > new Date().getTime() / 1000 && tokenInfo.UserInfo.roles.Andelan.length > 0) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

/**
 * @name setsignInError
 * @summary Reads signin error from url and adds it to localStorage
 */
export const setSignInError = () => {
  const params = (new URL(document.location)).searchParams;
  const signInError = params.get('error');
  // for andela guest emails
  const token = getToken();
  const isAndelan = tokenIsValid(token);
  if (signInError || (token && !isAndelan)) {
    localStorage.setItem('signInError', signInError);
  }
};

/**
 * @name isFellow
 * @summary Checks that token payload has Fellow role
 * @return {boolean} representing token
 */
export const isFellow = (tokenInfo) => {
  try {
    if (tokenInfo.UserInfo.roles.Fellow.length > 0) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};