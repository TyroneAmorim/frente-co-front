import { AxiosResponse } from 'axios';
import { RegisterData } from '../interfaces/registerData';
import { getTokenUser } from '../utils/user';
import api from './api';

const saveUser = (cadastroData: RegisterData): Promise<AxiosResponse> => {
  const userIsLogged = getTokenUser() !== null;
  return userIsLogged ? api.patch('client', cadastroData) : api.post('client', cadastroData);
};

const getRegisterData = (): Promise<AxiosResponse> => {
  return api.get('client');
};

const deleteAccountData = (): Promise<AxiosResponse> => {
  return api.delete('client');
};

export { saveUser, getRegisterData, deleteAccountData };
