import { useMemo } from 'react';
import { useCustomerPurchases } from '../../queries/customer';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import { PurchaseDetail } from '../../types/customer';
import { UI_MESSAGES } from '../../constants/ui';
import * as S from './PurchaseDetailModal.styles';

interface PurchaseDetailModalProps {
  customerId: number;
  customerName: string;
  onClose: () => void;
}

interface GroupedPurchase {
  date: string;
  products: PurchaseDetail[];
}

export const PurchaseDetailModal = ({
  customerId,
  customerName,
  onClose,
}: PurchaseDetailModalProps) => {
  useLockBodyScroll();
  const { data, isLoading } = useCustomerPurchases(customerId);

  const groupedPurchases = useMemo<GroupedPurchase[]>(() => {
    if (!data) return [];

    const groupedMap = data.reduce(
      (acc, purchase) => {
        if (!acc[purchase.date]) {
          acc[purchase.date] = [];
        }
        acc[purchase.date].push(purchase);
        return acc;
      },
      {} as Record<string, PurchaseDetail[]>,
    );

    return Object.entries(groupedMap)
      .map(([date, products]) => ({ date, products }))
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [data]);

  return (
    <S.Overlay onClick={onClose}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        <S.CloseButton onClick={onClose}>&times;</S.CloseButton>
        <S.Title>{customerName}님의 구매 내역</S.Title>

        <S.List>
          {isLoading ? (
            <S.StatusMessage>
              {UI_MESSAGES.LOADING.PURCHASE_DETAIL}
            </S.StatusMessage>
          ) : groupedPurchases.length === 0 ? (
            <S.StatusMessage>
              {UI_MESSAGES.ERROR.NO_PURCHASE_HISTORY}
            </S.StatusMessage>
          ) : (
            groupedPurchases.map((group) => (
              <S.DateGroup key={group.date}>
                <S.DateHeader>{group.date}</S.DateHeader>
                {group.products.map((purchase, index) => (
                  <S.PurchaseCard
                    key={`${group.date}-${purchase.product}-${index}`}
                  >
                    <S.ProductImg
                      src={purchase.imgSrc}
                      alt={purchase.product}
                    />
                    <S.Info>
                      <S.ProductName>{purchase.product}</S.ProductName>
                      <S.DetailText>{purchase.quantity}개</S.DetailText>
                      <S.Price>
                        {(purchase.price / purchase.quantity).toLocaleString()}
                        원 &nbsp;*&nbsp;
                        {purchase.quantity}개&nbsp;=&nbsp;
                        {purchase.price.toLocaleString()}원
                      </S.Price>
                    </S.Info>
                  </S.PurchaseCard>
                ))}
              </S.DateGroup>
            ))
          )}
        </S.List>
      </S.ModalContainer>
    </S.Overlay>
  );
};
