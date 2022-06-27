import { CardInfo } from '../models/Card';

export interface CreateCard {
  exec(params: CardInfo): Promise<CardInfo>;
}
