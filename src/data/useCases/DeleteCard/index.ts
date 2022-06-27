import { UnexpectedError } from '@/domain/errors';
import { HttpClient, HttpStatusCode } from '@/data/protocols/http';
import { CardInfoApiResponse } from '@/data/protocols/Cards/create-card';
import { CardInfo } from '@/domain/models/Card';
import { DeleteCard } from '@/domain/useCases/DeleteCard';

export class DeleteCardUseCase implements DeleteCard {
  constructor(
    private readonly path: string,
    private readonly HttpPostClient: HttpClient<CardInfoApiResponse[]>,
  ) {}

  async exec(cardInfo: CardInfo): Promise<void> {
    const httpResponse = await this.HttpPostClient.request({
      method: 'delete',
      path: `${this.path}/${cardInfo.id}`,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: {
        return;
      }
      default:
        throw new UnexpectedError();
    }
  }
}
