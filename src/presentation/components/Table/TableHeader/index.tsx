import { TableProps } from '@/presentation/interfaces/Table';
import { TextExtraLarge } from '@/presentation/styles/texts';
import React from 'react';
import { HeaderContainer } from '../Table.styles';

export const TableHeader: React.FC<TableProps> = ({ columns }: TableProps) => {
  return (
    <HeaderContainer>
      {columns.map(({ columnName }, index) => (
        <th key={`${index}-${columnName}`}>
          <TextExtraLarge>{columnName}</TextExtraLarge>
        </th>
      ))}
    </HeaderContainer>
  );
};
