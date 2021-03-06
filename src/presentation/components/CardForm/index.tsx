import React, { memo, ReactNode, useContext, useState } from 'react';
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

const CardFormComponent: React.FC<Props> = ({
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
          COLUMNS_BY_ORDER[indexColumn],
          indexCard,
        );
      }
      setState({ ...state, isLoading: false, title: '', description: '' });
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
        <Input type="text" name="title" title="T??tulo:" placeholder="T??tulo" />
        <TextArea
          name="description"
          title="Descri????o:"
          placeholder="Descri????o"
        />
        {childrenFooter}
      </FormContainer>
    </ContextForm.Provider>
  );
};

export const CardForm = memo(CardFormComponent, (prevProps, nextProps) => {
  return (
    (!prevProps.info && !nextProps.info) ||
    Object.is(prevProps.info, nextProps.info)
  );
});
