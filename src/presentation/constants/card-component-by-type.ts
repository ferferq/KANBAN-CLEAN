import { CardCreate } from '@/presentation/components/Cards/CardCreate';
import { CardEdit } from '@/presentation/components/Cards/CardEdit';
import { CardShow } from '@/presentation/components/Cards/CardShow';
import { CardType } from '@/presentation/constants/card-type';

export const CardComponentByType = {
  [CardType.CREATE]: CardCreate,
  [CardType.SHOW]: CardShow,
  [CardType.EDIT]: CardEdit,
};
