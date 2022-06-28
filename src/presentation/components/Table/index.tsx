import { TableProps } from '@/presentation/interfaces/Table';
import React from 'react';
import { ContainerTable } from './Table.styles';
import { TableBodyCard } from './TableBodyCard';
import { TableHeader } from './TableHeader';

export const Table: React.FC<TableProps> = ({ columns }: TableProps) => {
  return (
    <ContainerTable>
      <table style={{ width: '100%' }}>
        <tbody style={{ width: '100%' }}>
          <TableHeader columns={columns} />
          <TableBodyCard columns={columns} />
        </tbody>
      </table>
    </ContainerTable>
  );
};
