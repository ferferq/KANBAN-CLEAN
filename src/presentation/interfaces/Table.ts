import { CardProps } from '@/domain/models/Card';

export type ColumnProps = {
  columnName: string;
  columnsBodyCard: CardProps[];
};

export type TableProps = {
  columns: ColumnProps[];
};
