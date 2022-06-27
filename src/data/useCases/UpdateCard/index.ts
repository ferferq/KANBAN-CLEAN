import { UnexpectedError } from '@/domain/errors';
import { UpdateCard } from '@/domain/useCases/UpdateCard';
import { HttpClient, HttpStatusCode } from '@/data/protocols/http';
import { CardInfoApiResponse } from '@/data/protocols/Cards/create-card';
import { CardInfo } from '@/domain/models/Card';

export class UpdateCardUseCase implements UpdateCard {
  constructor(
    private readonly path: string,
    private readonly HttpPostClient: HttpClient<CardInfoApiResponse[]>,
  ) {}

  async exec(cardInfo: CardInfo): Promise<void> {
    const httpResponse = await this.HttpPostClient.request({
      method: 'put',
      path: `${this.path}/${cardInfo.id}`,
      body: {
        id: cardInfo.id,
        titulo: cardInfo.title,
        conteudo: cardInfo.description,
        lista: cardInfo.list,
      },
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
