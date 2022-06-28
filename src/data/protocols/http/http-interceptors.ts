import { AxiosError, AxiosResponse, AxiosInstance } from 'axios';

export interface InterceptorsParams {
  response(response: AxiosResponse<any, any>): AxiosResponse<any, any>;
  responseError(error: AxiosError, api: AxiosInstance): Promise<any>;
}
