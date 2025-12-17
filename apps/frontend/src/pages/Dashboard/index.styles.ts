import styled from '@emotion/styled';

export const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 4rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContentContainer = styled.main`
  height: 100%;
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.textMain};
  letter-spacing: -0.025em;
  margin: 0;
`;

export const Description = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
`;

export const Section = styled.section`
  width: 100%;
  justify-content: center;
  align-items: center;
`;
