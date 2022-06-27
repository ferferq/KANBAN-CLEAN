import React from 'react';
import { Home } from '@/presentation/pages/Home';
import { makeCreateCard } from '../useCases/CreateCard';
import { InterceptorsResponseAuthenticate } from '@/infra/http/interceptors/interceptor-response-authenticate';
import { makeAxiosHttpClient } from '../http/axios-http-client-factory';
import { makeGetCard } from '../useCases/GetCards';
import { makeUpdateCard } from '../useCases/UpdateCard';
import { makeDeleteCard } from '../useCases/DeleteCard';

export const makeHome: React.FC = () => {
  const interceptorsResponseAuthenticate =
    new InterceptorsResponseAuthenticate();
  const axiosHttpClient = makeAxiosHttpClient(
    process.env.API_URL,
    interceptorsResponseAuthenticate,
  );
  return (
    <Home
      createCardUseCase={makeCreateCard(axiosHttpClient)}
      getCardUseCase={makeGetCard(axiosHttpClient)}
      updateCardUseCase={makeUpdateCard(axiosHttpClient)}
      deleteCardUseCase={makeDeleteCard(axiosHttpClient)}
    />
  );
};
