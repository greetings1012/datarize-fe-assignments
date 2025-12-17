import { useCustomerPurchases } from '../../hooks/queries';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import * as S from './PurchaseDetailModal.styles';

interface PurchaseDetailModalProps {
  customerId: number;
  customerName: string;
  onClose: () => void;
}

export const PurchaseDetailModal = ({ customerId, customerName, onClose }: PurchaseDetailModalProps) => {
  useLockBodyScroll();
  const { data, isLoading } = useCustomerPurchases(customerId);

  return (
    <S.Overlay onClick={onClose}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        <S.CloseButton onClick={onClose}>&times;</S.CloseButton>
        <S.Title>{customerName}님의 구매 내역</S.Title>

        <S.List>
          {isLoading ? (
            <S.StatusMessage>로딩 중...</S.StatusMessage>
          ) : data?.length === 0 ? (
            <S.StatusMessage>구매 내역이 없습니다.</S.StatusMessage>
          ) : (
            data?.map((purchase) => (
              <S.PurchaseCard key={purchase.date}>
                <S.ProductImg src={purchase.imgSrc} alt={purchase.product} />
                <S.Info>
                  <S.ProductName>{purchase.product}</S.ProductName>
                  <S.DetailText>구매일: {purchase.date}</S.DetailText>
                  <S.Price>{purchase.price.toLocaleString()}원</S.Price>
                </S.Info>
              </S.PurchaseCard>
            ))
          )}
        </S.List>
      </S.ModalContainer>
    </S.Overlay>
  );
};
