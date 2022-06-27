import { CardInfo } from '../models/Card';

export interface UpdateCard {
  exec(params: CardInfo): Promise<void>;
}
