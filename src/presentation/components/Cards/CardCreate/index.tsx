import React from 'react';
import { CardForm } from '@/presentation/components/CardForm';
import { CardContainer } from '../Card.styles';
import { BsPlusSquare } from 'react-icons/bs';
import { ButtonIcon } from '@/presentation/components/Buttons/ButtonIcon';

const FooterCardCreate: React.FC = () => {
  return (
    <ButtonIcon type="submit">
      <BsPlusSquare />
    </ButtonIcon>
  );
};

export const CardCreate: React.FC = () => {
  return (
    <CardContainer>
      <CardForm childrenFooter={<FooterCardCreate />} />
    </CardContainer>
  );
};
