import styled from '@emotion/styled';

export const ChartContainer = styled.div`
  height: 300px;
  width: 100%;
  position: relative;
  & *:focus {
    outline: none;
  }
  & > div {
    position: absolute;
    top: 0;
    left: 0;
  }
`;
