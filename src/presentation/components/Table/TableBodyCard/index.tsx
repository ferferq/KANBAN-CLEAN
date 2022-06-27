import React from 'react';
import { ColumnsContainer, ContainerTh } from '../Table.styles';
import { CardComponentByType } from '@/presentation/constants/card-component-by-type';
import { TableProps } from '@/presentation/interfaces/Table';

export const TableBodyCard: React.FC<TableProps> = ({
  columns,
}: TableProps) => {
  return (
    <ColumnsContainer>
      {columns.map((column, index) => (
        <th key={index}>
          <ContainerTh>
            {column.columnsBodyCard &&
              column.columnsBodyCard.map((card, indexCard) => {
                const RenderCardType = CardComponentByType[card.type];
                return (
                  <RenderCardType
                    key={card.data?.id || indexCard}
                    {...card}
                    indexColumn={index}
                    indexCard={indexCard}
                  />
                );
              })}
          </ContainerTh>
        </th>
      ))}
    </ColumnsContainer>
  );
};
