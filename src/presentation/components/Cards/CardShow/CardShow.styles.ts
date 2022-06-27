import styled from 'styled-components';

export const CardShowContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem 0.5rem;
  display: flex;
  flex-direction: column;
  text-align: left;

  h2 {
    overflow-x: auto;
  }
`;

export const CardHeader = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
`;

export const CardMain = styled.main`
  width: 100%;
  height: 100%;
  margin: 0.5rem 0;
  font-weight: 400;

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }
`;

export const CardFooter = styled.footer`
  width: 100%;
  display: flex;
  justify-content: space-between;
  div {
    width: 1.5rem;
  }
`;
