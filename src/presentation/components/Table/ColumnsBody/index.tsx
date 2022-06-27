import { CardProps } from '@/domain/models/Card';
import { CardComponentByType } from '@/presentation/constants/card-component-by-type';
import React, { memo } from 'react';
import { ContainerTh } from '../Table.styles';

type Props = {
  cards: CardProps[];
  indexFather: number;
};

const ColumnsBodyCardComponent: React.FC<Props> = ({
  cards,
  indexFather,
}: Props) => {
  return (
    <ContainerTh>
      {cards &&
        cards.map((card, indexCard) => {
          const RenderCardType = CardComponentByType[card.type];
          return (
            <RenderCardType
              key={card.data?.id || indexCard}
              {...card}
              indexColumn={indexFather}
              indexCard={indexCard}
            />
          );
        })}
    </ContainerTh>
  );
};

export const ColumnsBodyCard = memo(
  ColumnsBodyCardComponent,
  (prevProps, nextProps) => {
    return Object.is(prevProps.cards, nextProps.cards);
  },
);
