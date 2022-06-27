import React, { useEffect, useState } from 'react';
import { ContainerContent } from '@/presentation/components/layout-common/ContainerContent';
import { ContainerPages } from '@/presentation/components/layout-common/ContainerPages';
import { Table } from '@/presentation/components/Table';
import { COLUMNS_NAME } from '@/presentation/constants/columns-name';
import { COLUMNS_BY_ORDER } from '@/presentation/constants/columns-by-order';
import { CardType } from '@/presentation/constants/card-type';
import { ColumnProps } from '@/presentation/interfaces/Table';
import ContextHome from '@/presentation/contexts/home/home-context';
import { ListCards } from '@/domain/models/ListCard';
import { CreateCard } from '@/domain/useCases/CreateCard';
import { CardInfo } from '@/domain/models/Card';
import { GetCards } from '@/domain/useCases/GetCard';
import { UpdateCard } from '@/domain/useCases/UpdateCard';
import { DeleteCard } from '@/domain/useCases/DeleteCard';
import { execFunctionWithProcessingToast } from '@/presentation/utils/exec-function-with-toast';

type StateProps = {
  result: ListCards;
  columnsBody?: ColumnProps[];
};

type Props = {
  createCardUseCase: CreateCard;
  getCardUseCase: GetCards;
  updateCardUseCase: UpdateCard;
  deleteCardUseCase: DeleteCard;
};

export const Home: React.FC<Props> = ({
  createCardUseCase,
  getCardUseCase,
  updateCardUseCase,
  deleteCardUseCase,
}: Props) => {
  const [state, setState] = useState<StateProps>({
    result: null,
    columnsBody: null,
  });

  useEffect(() => {
    const handleGetCards = async (): Promise<void> => {
      const result = await getCardUseCase.exec();
      setStateHomeByResult(result);
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    handleGetCards();
  }, []);

  const setStateHomeByResult = (result: ListCards): void => {
    const columnByOrder = [];
    COLUMNS_BY_ORDER.forEach((columnName) => {
      if (result[columnName]) {
        const column = [...result[columnName]];
        columnByOrder.push({
          columnName: columnName,
          columnsBodyCard: column,
        });
      } else {
        columnByOrder.push({
          columnName: columnName,
          columnsBodyCard: [],
        });
      }
    });

    setState({
      ...state,
      result,
      columnsBody: columnByOrder,
    });
  };

  const handleCreateNewCard = async (card: CardInfo): Promise<void> => {
    const createNewCard = async (): Promise<void> => {
      const cardCreated = await createCardUseCase.exec({
        ...card,
        list: COLUMNS_NAME.TO_DO,
      });
      const result = [...state.result[COLUMNS_NAME.TO_DO]];

      result.push({
        type: CardType.SHOW,
        data: cardCreated,
      });

      setStateHomeByResult({
        ...state.result,
        [COLUMNS_NAME.TO_DO]: result,
      });
    };
    await execFunctionWithProcessingToast({
      functionCall: createNewCard,
      messageSuccess: 'Card salvo!',
    });
  };

  const hadleUpdateTypeCard = async (
    type: CardType,
    columnsName: string,
    indexCard: number,
  ): Promise<void> => {
    const columns = [...state.result[columnsName]];

    columns[indexCard] = {
      ...columns[indexCard],
      type: type,
    };

    setStateHomeByResult({
      ...state.result,
      [columnsName]: columns,
    });
  };

  const handleUpdateCard = async (
    cardInfo: CardInfo,
    columnsName: string,
    indexCard: number,
  ): Promise<void> => {
    const onUpdateCard = async (): Promise<void> => {
      const columns = [...state.result[columnsName]];

      columns[indexCard] = {
        type: CardType.SHOW,
        data: cardInfo,
      };
      const column = columns[indexCard];
      await updateCardUseCase.exec(column.data);

      setStateHomeByResult({
        ...state.result,
        [columnsName]: columns,
      });
    };

    await execFunctionWithProcessingToast({
      functionCall: onUpdateCard,
      messageSuccess: 'Card Atulizado com sucesso!',
    });
  };

  const handleUpdateColumnCard = async (
    cardInfo: CardInfo,
    columnsOld: COLUMNS_NAME,
    columnDirect: COLUMNS_NAME,
    indexCard: number,
  ): Promise<void> => {
    const onUpdateColumnCard = async (): Promise<void> => {
      await updateCardUseCase.exec({
        ...cardInfo,
        list: columnDirect,
      });
      const columns = [...state.result[columnsOld]];
      const newColumn = [...state.result[columnDirect]];

      newColumn.push({
        ...columns[indexCard],
        data: cardInfo,
      });

      columns.splice(indexCard, 1);

      setStateHomeByResult({
        ...state.result,
        [columnsOld]: columns,
        [columnDirect]: newColumn,
      });
    };

    await execFunctionWithProcessingToast({
      functionCall: onUpdateColumnCard,
      messageSuccess: `Card Atulizado para ${columnDirect}`,
    });
  };

  const handleDeleteCard = async (
    cardInfo: CardInfo,
    columnName: string,
    indexCard: number,
  ): Promise<void> => {
    const onDeleteCard = async (): Promise<void> => {
      await deleteCardUseCase.exec(cardInfo);
      const columns = [...state.result[columnName]];

      columns.splice(indexCard, 1);

      setStateHomeByResult({
        ...state.result,
        [columnName]: columns,
      });
    };

    await execFunctionWithProcessingToast({
      functionCall: onDeleteCard,
      messageSuccess: 'Card excluído!',
    });
  };

  return (
    <ContainerPages>
      <ContextHome.Provider
        value={{
          handleCreateNewCard,
          hadleUpdateTypeCard,
          handleUpdateCard,
          handleUpdateColumnCard,
          handleDeleteCard,
        }}
      >
        <ContainerContent>
          {state.columnsBody && state.result && (
            <Table columns={state.columnsBody} />
          )}
        </ContainerContent>
      </ContextHome.Provider>
    </ContainerPages>
  );
};
