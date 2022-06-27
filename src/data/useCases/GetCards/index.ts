import { UnexpectedError } from '@/domain/errors';
import { GetCards } from '@/domain/useCases/GetCard';
import { ListCards } from '@/domain/models/ListCard';
import { HttpClient, HttpStatusCode } from '@/data/protocols/http';
import { CardInfoApiResponse } from '@/data/protocols/Cards/create-card';
import { ListCardsDefault } from '@/domain/useCases/ListCardDefault';

export class GetCardsUseCase implements GetCards {
  constructor(
    private readonly path: string,
    private readonly HttpPostClient: HttpClient<CardInfoApiResponse[]>,
  ) {}

  async exec(): Promise<ListCards> {
    const httpResponse = await this.HttpPostClient.request({
      method: 'get',
      path: this.path,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: {
        const listCardsDefault = new ListCardsDefault(httpResponse.body);
        return listCardsDefault.result;
      }
      default:
        throw new UnexpectedError();
    }
  }
}
