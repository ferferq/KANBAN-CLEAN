import { HttpClient, HttpStatusCode } from '@/data/protocols/http';
import { CardInfoApiResponse } from '@/data/protocols/Cards/create-card';
import { UnexpectedError } from '@/domain/errors';
import { FieldsRequiredCreateCard } from '@/domain/errors/fields-required-create-card';
import { CreateCard } from '@/domain/useCases/CreateCard';
import { CardInfo } from '@/domain/models/Card';

export class CreateCardUseCase implements CreateCard {
  constructor(
    private readonly path: string,
    private readonly HttpPostClient: HttpClient<CardInfoApiResponse>,
  ) {}

  async exec(params: CardInfo): Promise<CardInfo> {
    const httpResponse = await this.HttpPostClient.request({
      method: 'post',
      path: this.path,
      body: {
        titulo: params.title,
        conteudo: params.description,
        lista: params.list,
      },
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.create:
        return {
          id: httpResponse.body.id,
          title: httpResponse.body.titulo,
          description: httpResponse.body.conteudo,
          list: httpResponse.body.lista,
        };
      case HttpStatusCode.badRequest:
        throw new FieldsRequiredCreateCard();
      default:
        throw new UnexpectedError();
    }
  }
}
