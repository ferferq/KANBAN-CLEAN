import { COLORS } from '@/presentation/styles/colors';
import styled from 'styled-components';

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: left;
  input {
    background: transparent;
    border-width: 0rem 0rem 0.06rem 0.06rem;
    border-style: solid;
    border-color: #ffffff;
    border-radius: 0rem 0.5rem 0rem 0.5rem;
    padding: 0.5rem;
    margin-top: 0.5rem;

    transition: color 0.3s ease;

    &:focus {
      border-color: ${COLORS.YELLOW_600};
      box-shadow: 0 0 10px ${COLORS.WHITE};
    }
  }
`;
