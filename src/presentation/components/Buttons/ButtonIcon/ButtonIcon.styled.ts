import { COLORS } from '@/presentation/styles/colors';
import styled from 'styled-components';
import { Props } from './';

export const ButtonIconContainer = styled.button<Props>`
  border: 0;
  background: transparent;

  svg {
    min-width: 1.5rem;
    font-size: 1.5rem;
  }

  transition: color 0.3s ease;

  :hover {
    color: ${COLORS.YELLOW_600};
  }
`;
