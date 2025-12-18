import styled from '@emotion/styled';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background: ${({ theme }) => theme.colors.white};
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  padding: 2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: ${({ theme }) => theme.shadows.main};
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
  &:hover {
    color: ${({ theme }) => theme.colors.textMain};
  }
`;

export const Title = styled.h2`
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMain};
`;

export const List = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const DateGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const DateHeader = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding-bottom: 0.5rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
`;

export const PurchaseCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
`;

export const ProductImg = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 8px;
  object-fit: cover;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;
export const ProductName = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMain};
`;
export const DetailText = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Price = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMain};
  margin-top: 2px;
`;

export const StatusMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
