import constants from './constants';

const getTokenUser = () => {
  return localStorage.getItem(constants.TOKEN_USER);
};

const logoutUser = () => {
  localStorage.removeItem(constants.TOKEN_USER);
};

export { getTokenUser, logoutUser };
