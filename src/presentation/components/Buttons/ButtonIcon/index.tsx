import React, { ReactNode } from 'react';
import { ButtonIconContainer } from './ButtonIcon.styled';

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const ButtonIcon: React.FC<Props> = ({ children, ...props }: Props) => {
  return <ButtonIconContainer {...props}>{children}</ButtonIconContainer>;
};
