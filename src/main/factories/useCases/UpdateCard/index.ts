import { UpdateCardUseCase } from '@/data/useCases/UpdateCard';
import { UpdateCard } from '@/domain/useCases/UpdateCard';
import { AxiosHttpClient } from '@/infra/http/axios-http-client';

export const makeUpdateCard = (
  makeAxiosHttpClient: AxiosHttpClient,
): UpdateCard => {
  return new UpdateCardUseCase('/cards', makeAxiosHttpClient);
};
