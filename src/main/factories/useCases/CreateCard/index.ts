import { CreateCardUseCase } from '@/data/useCases/CreateCard';
import { CreateCard } from '@/domain/useCases/CreateCard';
import { AxiosHttpClient } from '@/infra/http/axios-http-client';

export const makeCreateCard = (
  makeAxiosHttpClient: AxiosHttpClient,
): CreateCard => {
  return new CreateCardUseCase('/cards', makeAxiosHttpClient);
};
