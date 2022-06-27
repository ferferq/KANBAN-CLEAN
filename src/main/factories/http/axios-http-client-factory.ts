import { InterceptorsParams } from '@/data/protocols/http';
import { AxiosHttpClient } from '@/infra/http/axios-http-client';
import axios from 'axios';

export const makeAxiosHttpClient = (
  url: string,
  interceptorsResponse?: InterceptorsParams,
): AxiosHttpClient => {
  const api = axios.create({
    baseURL: url,
  });
  return new AxiosHttpClient(api, interceptorsResponse);
};
