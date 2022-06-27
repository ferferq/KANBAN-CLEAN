import axios from 'axios';
import faker from 'faker';
import { HttpRequest } from '@/data/protocols/http';

export const mockHttpResponse = (): any => ({
  data: faker.random.objectElement(),
  status: faker.datatype.number(),
});

export const mockHttpRequest = (): HttpRequest => ({
  path: faker.internet.url(),
  method: faker.random.arrayElement(['get', 'post', 'put', 'delete']),
  body: faker.random.objectElement(),
  headers: faker.random.objectElement(),
});

export const mockCreateInstance = (): any => ({
  defaults: {
    headers: [],
  },
});

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  mockedAxios.request.mockClear().mockResolvedValue(mockHttpResponse());
  mockedAxios.create.mockReturnValue(mockCreateInstance());
  return mockedAxios;
};
