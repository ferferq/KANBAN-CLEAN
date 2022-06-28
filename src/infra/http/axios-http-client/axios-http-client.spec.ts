import { mockAxios, mockHttpRequest, mockHttpResponse } from '@/infra/test';
import { MockInterceptorsResponse } from '@/infra/test/inteceptors/mock-interceptors-response';
import axios from 'axios';
import { AxiosHttpClient } from './axios-http-client';

jest.mock('axios');

type SutTypes = {
  sut: AxiosHttpClient;
  mockedAxios: jest.Mocked<typeof axios>;
  mockInterceptorsResponse: MockInterceptorsResponse;
};

type makeSutProps = {
  mockedAxios?: jest.Mocked<typeof axios>;
  mockInterceptorsResponse?: MockInterceptorsResponse;
};

const makeSut = ({
  mockInterceptorsResponse = new MockInterceptorsResponse(),
  mockedAxios = mockAxios(),
}: makeSutProps): SutTypes => {
  const sut = new AxiosHttpClient(mockedAxios, mockInterceptorsResponse);
  return {
    sut,
    mockedAxios,
    mockInterceptorsResponse,
  };
};

describe('AxiosHttpClient', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test('Should call axios with correct values', async () => {
    const request = mockHttpRequest();
    const { sut, mockedAxios } = makeSut({});

    await sut.request(request);

    expect(mockedAxios.request).toHaveBeenCalledWith({
      url: request.path,
      data: request.body,
      headers: request.headers,
      method: request.method,
    });
  });

  test('Should return correct response', async () => {
    const { sut, mockedAxios } = makeSut({});

    const httpResponse = await sut.request(mockHttpRequest());
    const axiosResponse = await mockedAxios.request.mock.results[0].value;

    expect(httpResponse).toEqual({
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    });
  });

  test('Should return correct error', () => {
    const { sut, mockedAxios } = makeSut({});
    mockedAxios.request.mockRejectedValueOnce({
      response: mockHttpResponse(),
    });

    const promise = sut.request(mockHttpRequest());

    expect(promise).toEqual(mockedAxios.request.mock.results[0].value);
  });

  test('Should call interceptors response with correct values', async () => {
    const mockedAxios = mockAxios();
    const mockInterceptorsResponse = new MockInterceptorsResponse();
    makeSut({ mockedAxios, mockInterceptorsResponse });
    expect(mockedAxios.interceptors.response.use).toHaveBeenCalledWith(
      mockInterceptorsResponse.response,
      expect.any(Function),
    );
  });

  test('Should call interceptors responseError with correct values', async () => {
    const mockedAxios = mockAxios();
    const mockInterceptorsResponse = new MockInterceptorsResponse();
    const teste = jest.spyOn(mockedAxios.interceptors.response, 'use');
    makeSut({ mockedAxios, mockInterceptorsResponse });
    expect(teste.mock.calls[0][1].toString().replaceAll(' ', '')).toBe(
      `(error) => __awaiter(this, void 0, void 0, function* () {
                return yield this.interceptorsResponse.responseError(error, this.api);
            })`.replaceAll(' ', ''),
    );
  });
});
