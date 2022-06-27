import { ListCards } from '../models/ListCard';

export interface GetCards {
  exec(): Promise<ListCards>;
}
