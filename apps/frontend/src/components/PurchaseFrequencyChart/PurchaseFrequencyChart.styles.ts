import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

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

export const StatusMessage = styled.div<{ isError?: boolean }>`
  height: 300px;
  width: 100%;
  display: flex;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${({ theme, isError }) => (isError ? theme.colors.error : theme.colors.textSecondary)};
  background: ${({ theme }) => theme.colors.hover};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  animation: ${fadeIn} 0.4s ease-out;

  &::before {
    content: ${({ isError }) => (isError ? '!' : '?')};
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.5rem;
    height: 3.5rem;
    background: ${({ theme }) => theme.colors.white};
    border-radius: 50%;
    font-size: 1.5rem;
    font-weight: bold;
    box-shadow: ${({ theme }) => theme.shadows.main};
    margin-bottom: 0.5rem;
  }
`;

export const MessageTitle = styled.div`
  font-weight: 600;
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.textMain};
`;

export const MessageDesc = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  max-width: 80%;
`;
