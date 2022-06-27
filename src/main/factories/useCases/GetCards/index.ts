import { GetCardsUseCase } from '@/data/useCases/GetCards';
import { GetCards } from '@/domain/useCases/GetCard';
import { AxiosHttpClient } from '@/infra/http/axios-http-client';

export const makeGetCard = (makeAxiosHttpClient: AxiosHttpClient): GetCards => {
  return new GetCardsUseCase('/cards', makeAxiosHttpClient);
};
