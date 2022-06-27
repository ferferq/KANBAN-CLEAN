import React, { ReactNode, useContext, useState } from 'react';
import { Input } from '@/presentation/components/Input';
import { TextArea } from '@/presentation/components/TextArea';
import { FormContainer } from './CardForm.styles';
import ContextForm from '@/presentation/contexts/form/form-context';
import ContextHome from '@/presentation/contexts/home/home-context';
import { ContextHomeProps } from '@/presentation/interfaces/Home';
import { COLUMNS_BY_ORDER } from '@/presentation/constants/columns-by-order';
import { CardInfo } from '@/domain/models/Card';
import { filterElementsHtmlSecurity } from '@/presentation/utils/filter-elements-html-security';

type Props = {
  info?: CardInfo;
  childrenFooter: ReactNode;
  indexColumn?: number;
  indexCard?: number;
};

export const CardForm: React.FC<Props> = ({
  info,
  childrenFooter,
  indexColumn,
  indexCard,
}: Props) => {
  const { handleCreateNewCard, handleUpdateCard } =
    useContext<ContextHomeProps>(ContextHome);

  const [state, setState] = useState({
    isLoading: false,
    title: info?.title || '',
    description: info?.description || '',
    mainError: '',
  });

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    try {
      if (state.isLoading) {
        return;
      }
      setState({ ...state, isLoading: true });

      const description = filterElementsHtmlSecurity(state.description);
      if (!info) {
        await handleCreateNewCard({
          title: state.title,
          description,
          list: null,
        });
      } else {
        await handleUpdateCard(
          {
            id: info.id,
            title: state.title,
            description,
            list: info.list,
          },
          COLUMNS_BY_ORDER[indexColumn - 1],
          indexCard,
        );
      }
      setState({ ...state, isLoading: false });
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        mainError: error.message,
      });
    }
  };

  return (
    <ContextForm.Provider value={{ state, setState }}>
      <FormContainer onSubmit={handleSubmit}>
        <Input type="text" name="title" title="Título:" placeholder="Título" />
        <TextArea
          name="description"
          title="Descrição:"
          placeholder="Descrição"
        />
        {childrenFooter}
      </FormContainer>
    </ContextForm.Provider>
  );
};
