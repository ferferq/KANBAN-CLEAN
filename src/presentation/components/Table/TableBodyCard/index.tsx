import React, { memo } from 'react';
import { ColumnsContainer } from '../Table.styles';
import { TableProps } from '@/presentation/interfaces/Table';
import { ColumnsBodyCard } from '../ColumnsBody';

const TableBodyCardComponent: React.FC<TableProps> = ({
  columns,
}: TableProps) => {
  return (
    <ColumnsContainer>
      {columns.map((column, index) => (
        <th key={index}>
          <ColumnsBodyCard cards={column.columnsBodyCard} indexFather={index} />
        </th>
      ))}
    </ColumnsContainer>
  );
};

export const TableBodyCard = memo(
  TableBodyCardComponent,
  (prevProps, nextProps) => {
    return Object.is(prevProps.columns, nextProps.columns);
  },
);
