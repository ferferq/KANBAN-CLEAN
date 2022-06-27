import React, { useContext } from 'react';
import { CardContainer } from '../Card.styles';
import { FaSave } from 'react-icons/fa';
import { BiBlock } from 'react-icons/bi';
import { CardForm } from '@/presentation/components/CardForm';
import { FooterFormCardEdit } from './CardEdit.styles';
import { CardType } from '@/presentation/constants/card-type';
import { COLUMNS_BY_ORDER } from '@/presentation/constants/columns-by-order';
import ContextHome from '@/presentation/contexts/home/home-context';
import { ContextHomeProps } from '@/presentation/interfaces/Home';
import { ButtonIcon } from '@/presentation/components/Buttons/ButtonIcon';
import { CardProps } from '@/domain/models/Card';

const FooterCardCreate: React.FC<CardProps> = ({
  indexCard,
  indexColumn,
}: CardProps) => {
  const { hadleUpdateTypeCard } = useContext<ContextHomeProps>(ContextHome);

  return (
    <FooterFormCardEdit>
      <ButtonIcon
        type="button"
        onClick={async () =>
          await hadleUpdateTypeCard(
            CardType.SHOW,
            COLUMNS_BY_ORDER[indexColumn],
            indexCard,
          )
        }
      >
        <BiBlock />
      </ButtonIcon>

      <ButtonIcon type="submit">
        <FaSave />
      </ButtonIcon>
    </FooterFormCardEdit>
  );
};

export const CardEdit: React.FC<CardProps> = (cardProps: CardProps) => {
  return (
    <CardContainer>
      <CardForm
        childrenFooter={<FooterCardCreate {...cardProps} />}
        info={cardProps.data || null}
        indexCard={cardProps.indexCard}
        indexColumn={cardProps.indexColumn}
      />
    </CardContainer>
  );
};
