import { COLORS } from '@/presentation/styles/colors';
import styled from 'styled-components';

export const TextAreaContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: left;
  textarea {
    height: 100%;
    background: transparent;
    border: 0.06rem solid ${COLORS.WHITE};
    border-radius: 0.5rem;
    resize: none;
    padding: 0.5rem;
    margin-top: 0.5rem;

    transition: color 0.3s ease;

    &:focus {
      border-color: ${COLORS.YELLOW_600};
      box-shadow: 0 0 10px ${COLORS.WHITE};
    }
  }
`;
