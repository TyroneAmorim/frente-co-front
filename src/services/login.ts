import { AxiosResponse } from 'axios';
import { LoginData } from '../view/Login/loginData.interface';
import api from './api';

const makeLogin = (loginData: LoginData): Promise<AxiosResponse> => {
  return api.post('auth/login', { email: loginData.email, password: loginData.password });
};

export default makeLogin;
