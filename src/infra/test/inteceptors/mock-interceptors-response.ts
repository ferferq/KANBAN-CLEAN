import { InterceptorsParams } from '@/data/protocols/http';
import { AxiosResponse, AxiosError, AxiosInstance } from 'axios';

export class MockInterceptorsResponse implements InterceptorsParams {
  responseProps: AxiosResponse<any, any>;
  error: AxiosError<unknown, any>;
  api: AxiosInstance;

  response(response: AxiosResponse<any, any>): AxiosResponse<any, any> {
    this.responseProps = response;
    return response;
  }

  async responseError(
    error: AxiosError<unknown, any>,
    api: AxiosInstance,
  ): Promise<any> {
    console.log('fer');
    this.error = error;
    this.api = api;
    return Promise.resolve(error);
  }
}
