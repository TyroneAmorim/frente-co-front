import { AxiosResponse } from 'axios';
import { NewOperationData } from '../interfaces/newOperation';
import api from './api';

const getOperations = (): Promise<AxiosResponse> => {
  return api.get('operation');
};

const saveOperation = (operationData: NewOperationData): Promise<AxiosResponse> => {
  return api.post('operation', operationData);
};

const getPackages = (): Promise<AxiosResponse> => {
  return api.get('operation/packages');
};

export { getOperations, saveOperation, getPackages };
