import { CardInfo } from '@/domain/models/Card';
import { CardType } from '../constants/card-type';

export interface ContextHomeProps {
  handleCreateNewCard(card: CardInfo): Promise<void>;
  hadleUpdateTypeCard(
    type: CardType,
    columnsName: string,
    indexCard: number,
  ): Promise<void>;
  handleUpdateCard(
    cardInfo: CardInfo,
    columnsName: string,
    indexCard: number,
  ): Promise<void>;
  handleUpdateColumnCard(
    cardInfo: CardInfo,
    columnsOld: string,
    columnDirect: string,
    indexCard: number,
  ): Promise<void>;
  handleDeleteCard(
    cardInfo: CardInfo,
    column: string,
    indexCard: number,
  ): Promise<void>;
}
