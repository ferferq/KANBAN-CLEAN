import { HttpStatusCode, InterceptorsParams } from '@/data/protocols/http';
import { AxiosInstance, AxiosError, AxiosResponse } from 'axios';

let isRefreshing = false;
let failedRequestsQueue = [];

export class InterceptorsResponseAuthenticate implements InterceptorsParams {
  response(response: AxiosResponse<any, any>): AxiosResponse<any, any> {
    return response;
  }

  async responseError(error: AxiosError, api: AxiosInstance): Promise<any> {
    if (error.response.status === HttpStatusCode.unauthorized) {
      const originalConfig = error.config;

      if (!isRefreshing) {
        isRefreshing = true;
        api
          .post('/login', {
            login: 'letscode',
            senha: 'lets@123',
          })
          .then((response) => {
            api.defaults.headers.common.Authorization = `Bearer ${response.data}`;

            failedRequestsQueue.forEach((request) =>
              request.onSuccess(response.data),
            );
            failedRequestsQueue = [];
          })
          .catch((err) => {
            failedRequestsQueue.forEach((request) => request.onFailure(err));
            failedRequestsQueue = [];
          })
          .finally(() => {
            isRefreshing = false;
          });
      }

      return new Promise((resolve, reject) => {
        failedRequestsQueue.push({
          onSuccess: (token: string) => {
            originalConfig.headers.Authorization = `Bearer ${token}`;

            resolve(api(originalConfig));
          },
          onFailure: (err: AxiosError) => {
            reject(err);
          },
        });
      });
    } else {
      return Promise.reject(error);
    }
  }
}
