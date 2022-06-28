import {
  HttpClient,
  HttpRequest,
  HttpResponse,
  InterceptorsParams,
} from '@/data/protocols/http';
import { AxiosResponse, AxiosInstance, AxiosError } from 'axios';

export class AxiosHttpClient implements HttpClient<any> {
  constructor(
    private readonly api: AxiosInstance,
    private readonly interceptorsResponse?: InterceptorsParams,
  ) {
    this.api.defaults.headers.common.Accept = '*/*';
    this.api.defaults.headers.common['Content-Type'] = 'application/json';
    if (this.interceptorsResponse) {
      this.api.interceptors.response.use(
        this.interceptorsResponse.response,
        /* istanbul ignore next */
        async (error: AxiosError) => {
          return await this.interceptorsResponse.responseError(error, this.api);
        },
      );
    }
  }

  async request(params: HttpRequest): Promise<HttpResponse<any>> {
    let httpResponse: AxiosResponse<any>;
    try {
      httpResponse = await this.api.request({
        method: params.method,
        url: params.path,
        data: params.body,
        headers: params.headers,
      });
    } catch (error) {
      httpResponse = error.response;
    }

    return {
      statusCode: httpResponse.status,
      body: httpResponse.data,
    };
  }
}
