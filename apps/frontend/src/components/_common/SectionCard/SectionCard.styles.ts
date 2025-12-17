import styled from '@emotion/styled';

export const Container = styled.div`
  padding: 1rem;
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.shadows.main};
  display: flex;
  padding: 1rem;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const Title = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMain};
`;

export const Controls = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  flex: 1;
  min-height: 0;
`;
