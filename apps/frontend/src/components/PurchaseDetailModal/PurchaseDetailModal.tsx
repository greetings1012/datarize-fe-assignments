import { useMemo } from 'react';
import { useCustomerPurchases } from '../../queries/customer';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import { PurchaseDetail } from '../../types/customer';
import { UI_MESSAGES } from '../../constants/ui';
import { StatusMessage } from '../StatusMessage/StatusMessage';
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
  const { data, isLoading, error } = useCustomerPurchases(customerId);

  // 구매 내역을 날짜별로 그룹화 (최신순 정렬)
  const groupedPurchases = useMemo<GroupedPurchase[]>(() => {
    if (!data) return [];

    const groupedMap = data.reduce<Record<string, PurchaseDetail[]>>(
      (acc, purchase) => {
        acc[purchase.date] = acc[purchase.date] || [];
        acc[purchase.date].push(purchase);
        return acc;
      },
      {},
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
            <StatusMessage title={UI_MESSAGES.LOADING.PURCHASE_DETAIL} />
          ) : error ? (
            <StatusMessage title={error.message} isError />
          ) : groupedPurchases.length === 0 ? (
            <StatusMessage
              title={UI_MESSAGES.EMPTY.PURCHASE_FREQUENCY_DESCRIPTION}
            />
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
