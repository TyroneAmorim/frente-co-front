import axios from 'axios';
import { getTokenUser } from '../utils/user';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use((config: any) => {
  const tokenUser = getTokenUser() ?? '';
  const conf = config;
  conf.headers['x-token-auth'] = tokenUser;
  return conf;
});

export default api;
