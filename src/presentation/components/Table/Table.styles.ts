import styled from 'styled-components';

export const ContainerTable = styled.section`
  width: 100%;
  overflow-x: auto;
`;

export const ColumnsContainer = styled.tr`
  width: 100%;
  padding: 0 2%;

  th {
    min-width: 17rem;
    max-width: 17rem;
    vertical-align: top;

    div + div {
      margin-top: 1rem;
    }
  }
`;

export const HeaderContainer = styled.tr`
  width: 100%;
  padding: 0 2%;

  th {
    width: 17rem;
    min-width: 17rem;
    padding: 1rem 0;
  }
`;

export const ContainerTh = styled.section`
  width: 100%;
  padding-bottom: 1rem;
  height: 85vh;
  overflow-y: auto;
`;
