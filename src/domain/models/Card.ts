import { CardType } from '@/presentation/constants/card-type';
import { COLUMNS_NAME } from '@/presentation/constants/columns-name';

export type CardInfo = {
  id?: string;
  title: string;
  description: string;
  list: COLUMNS_NAME;
};

export type CardProps = {
  type: CardType;
  data: CardInfo;
  indexColumn?: number;
  indexCard?: number;
};
