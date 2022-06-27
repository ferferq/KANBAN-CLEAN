import React, { ReactNode } from 'react';
import { ContainerPageStyle } from './ContainerPages.styles';

type Props = {
  children: ReactNode; // 👈️ type children
};

export const ContainerPages: React.FC<Props> = ({ children }: Props) => {
  return <ContainerPageStyle>{children}</ContainerPageStyle>;
};
