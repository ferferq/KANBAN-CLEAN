import { ListCards } from '@/domain/models/ListCard';
import { CardType } from '@/presentation/constants/card-type';
import { CardInfoApiResponse } from '@/data/protocols/Cards/create-card';
import { COLUMNS_NAME } from '@/presentation/constants/columns-name';

export class ListCardsDefault {
  result: ListCards = {
    [COLUMNS_NAME.NEW]: [
      {
        type: CardType.CREATE,
        data: {
          list: COLUMNS_NAME.NEW,
          title: 'COLUMNS_NAME.NEW',
          description: 'COLUMNS_NAME.NEW',
        },
      },
    ],
    [COLUMNS_NAME.DOING]: [],
    [COLUMNS_NAME.DONE]: [],
    [COLUMNS_NAME.TO_DO]: [],
  };

  constructor(private readonly cardProps: CardInfoApiResponse[]) {
    this.cardProps.forEach((card) => {
      const cardFormated = {
        type: CardType.SHOW,
        data: {
          id: card.id,
          list: card.lista,
          title: card.titulo,
          description: card.conteudo,
        },
      };
      let column = [];
      if (this.result[card.lista]) {
        column = [...this.result[card.lista]];
        column.push(cardFormated);
        this.result = {
          ...this.result,
          [card.lista]: column,
        };
      } else {
        this.result = {
          ...this.result,
          [card.lista]: [cardFormated],
        };
      }
    });
  }
}
