import { createGlobalStyle } from 'styled-components';
import { COLORS } from './colors';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html {
    @media (max-width: 1080px) {
      font-size: 93.75%; //15px
    }
    @media (max-width: 720px) {
      font-size: 87.5%; //14px
    }
  }

  body, input, button, textarea {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    color: ${COLORS.WHITE}
  }

  button {
    cursor: pointer;
  }

  *::-webkit-scrollbar {
    width: 0.5rem;
    height: 0.5rem;
    border: 0;
  }

  *::-webkit-scrollbar-track {
    background: transparent;
  }

  *::-webkit-scrollbar-thumb {
    background-color: ${COLORS.WHITE};
    border-radius: 0.5rem;
  }
`;
