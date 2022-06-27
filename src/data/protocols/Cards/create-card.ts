import { COLUMNS_NAME } from '@/presentation/constants/columns-name';

export type CardInfoApiRequest = {
  titulo: string;
  conteudo: string;
  lista: COLUMNS_NAME;
};

export type CardInfoApiResponse = {
  id: string;
  titulo: string;
  conteudo: string;
  lista: COLUMNS_NAME;
};
