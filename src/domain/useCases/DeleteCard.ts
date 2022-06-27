import { CardInfo } from '../models/Card';

export interface DeleteCard {
  exec(params: CardInfo): Promise<void>;
}
