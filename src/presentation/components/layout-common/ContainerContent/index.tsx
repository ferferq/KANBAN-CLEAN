import React, { ReactNode } from 'react';
import { ContainerContentStyles } from './ContainerContent.styles';

type Props = {
  children: ReactNode; // 👈️ type children
};

export const ContainerContent: React.FC<Props> = ({ children }: Props) => {
  return <ContainerContentStyles>{children}</ContainerContentStyles>;
};
