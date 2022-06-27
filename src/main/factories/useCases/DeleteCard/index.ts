import { DeleteCardUseCase } from '@/data/useCases/DeleteCard';
import { DeleteCard } from '@/domain/useCases/DeleteCard';
import { AxiosHttpClient } from '@/infra/http/axios-http-client';

export const makeDeleteCard = (
  makeAxiosHttpClient: AxiosHttpClient,
): DeleteCard => {
  return new DeleteCardUseCase('/cards', makeAxiosHttpClient);
};
