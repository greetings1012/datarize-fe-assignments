import styled from '@emotion/styled';

export const Input = styled.input`
  padding: 0.625rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 0.875rem;
  transition: all 0.2s;
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.main};
    outline: none;
  }
`;

export const Select = styled.select`
  padding: 0.625rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.white};
  font-size: 0.875rem;
  cursor: pointer;
`;

export const TableContainer = styled.div`
  overflow-x: auto;
`;
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th`
  padding: 1rem 0.75rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.hover};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.8125rem;
  font-weight: 600;
  text-transform: uppercase;
  text-align: left;
`;

export const Tr = styled.tr`
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: ${({ theme }) => theme.colors.hover};
  }
`;

export const Td = styled.td`
  padding: 1.125rem 0.75rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.hover};
  font-size: 0.9375rem;
`;

export const CustomerId = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.8125rem;
`;

export const CustomerName = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMain};
`;

export const TotalAmount = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

export const StatusRow = styled.td`
  text-align: center;
  padding: 5rem 1rem;
`;

export const EmptyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;

  &::before {
    content: 'i';
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    background: ${({ theme }) => theme.colors.hover};
    border-radius: 50%;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: 0.5rem;
  }
`;

export const StatusTitle = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMain};
`;

export const StatusDesc = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
