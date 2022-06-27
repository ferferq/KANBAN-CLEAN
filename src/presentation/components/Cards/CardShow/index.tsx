import { TextAreaSmall, TextMedium } from '@/presentation/styles/texts';
import React, { memo, useContext } from 'react';
import { CardContainer } from '../Card.styles';
import {
  CardFooter,
  CardHeader,
  CardMain,
  CardShowContainer,
} from './CardShow.styles';
import { FaRegEdit } from 'react-icons/fa';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';
import { AiFillDelete } from 'react-icons/ai';
import { COLUMNS_BY_ORDER } from '@/presentation/constants/columns-by-order';
import ContextHome from '@/presentation/contexts/home/home-context';
import { CardType } from '@/presentation/constants/card-type';
import { ContextHomeProps } from '@/presentation/interfaces/Home';
import { ButtonIcon } from '@/presentation/components/Buttons/ButtonIcon';
import { CardProps } from '@/domain/models/Card';
import { useMarked } from '@/presentation/utils/use-marked';

const indexBeforeColumnCreate = 1;

const CardShowComponent: React.FC<CardProps> = ({
  data,
  indexColumn = indexBeforeColumnCreate,
  indexCard = 0,
}: CardProps) => {
  if (!data) return null;
  const { hadleUpdateTypeCard, handleUpdateColumnCard, handleDeleteCard } =
    useContext<ContextHomeProps>(ContextHome);

  return (
    <CardContainer>
      <CardShowContainer>
        <CardHeader>
          <TextMedium>{data.title.toLocaleUpperCase()}</TextMedium>
          <ButtonIcon
            type="button"
            onClick={async () =>
              await hadleUpdateTypeCard(
                CardType.EDIT,
                COLUMNS_BY_ORDER[indexColumn],
                indexCard,
              )
            }
          >
            <FaRegEdit />
          </ButtonIcon>
        </CardHeader>
        <CardMain
          dangerouslySetInnerHTML={{
            __html: useMarked(data.description),
          }}
        />
        <CardFooter>
          <div>
            {indexColumn !== indexBeforeColumnCreate && (
              <ButtonIcon
                type="button"
                onClick={async () => {
                  await handleUpdateColumnCard(
                    data,
                    COLUMNS_BY_ORDER[indexColumn],
                    COLUMNS_BY_ORDER[indexColumn - 1],
                    indexCard,
                  );
                }}
              >
                <BsArrowLeftCircleFill />
              </ButtonIcon>
            )}
          </div>
          <ButtonIcon
            type="button"
            onClick={async () => {
              await handleDeleteCard(
                data,
                COLUMNS_BY_ORDER[indexColumn],
                indexCard,
              );
            }}
          >
            <AiFillDelete />
          </ButtonIcon>
          <div>
            {indexColumn !==
              COLUMNS_BY_ORDER.length - indexBeforeColumnCreate && (
              <ButtonIcon
                type="button"
                onClick={async () => {
                  await handleUpdateColumnCard(
                    data,
                    COLUMNS_BY_ORDER[indexColumn],
                    COLUMNS_BY_ORDER[indexColumn + 1],
                    indexCard,
                  );
                }}
              >
                <BsArrowRightCircleFill />
              </ButtonIcon>
            )}
          </div>
        </CardFooter>
      </CardShowContainer>
    </CardContainer>
  );
};

export const CardShow = memo(CardShowComponent, (prevProps, nextProps) => {
  return Object.is(prevProps, nextProps);
});
