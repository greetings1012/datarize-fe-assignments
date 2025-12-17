import { useState } from 'react';
import { useCustomers } from '../../hooks/queries';
import { PurchaseDetailModal } from '../PurchaseDetailModal/PurchaseDetailModal';
import { SectionCard } from '../SectionCard/SectionCard';
import * as S from './CustomerTable.styles';

export const CustomerTable = () => {
  const [nameFilter, setNameFilter] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | undefined>('desc');
  const [selectedCustomer, setSelectedCustomer] = useState<{ id: number; name: string } | null>(null);

  const { data, isLoading, isError } = useCustomers(sortOrder, nameFilter);

  return (
    <SectionCard>
      <SectionCard.Header>
        <SectionCard.Title>고객 목록</SectionCard.Title>
        <SectionCard.Controls>
          <S.Input
            type="text"
            placeholder="이름으로 검색..."
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          />
          <S.Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}>
            <option value="desc">구매액 높은순</option>
            <option value="asc">구매액 낮은순</option>
          </S.Select>
        </SectionCard.Controls>
      </SectionCard.Header>

      <SectionCard.Content>
        <S.TableContainer>
          <S.Table>
            <thead>
              <tr>
                <S.Th>ID</S.Th>
                <S.Th>고객명</S.Th>
                <S.Th>구매 횟수</S.Th>
                <S.Th>총 구매액</S.Th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <S.Td colSpan={4}>데이터 로딩 중...</S.Td>
                </tr>
              ) : isError ? (
                <tr>
                  <S.Td colSpan={4}>데이터를 불러오지 못했습니다.</S.Td>
                </tr>
              ) : (
                data?.map((customer) => (
                  <S.Tr key={customer.id} onClick={() => setSelectedCustomer({ id: customer.id, name: customer.name })}>
                    <S.Td>#{customer.id}</S.Td>
                    <S.Td>{customer.name}</S.Td>
                    <S.Td>{customer.count}회</S.Td>
                    <S.Td>{customer.totalAmount.toLocaleString()}원</S.Td>
                  </S.Tr>
                ))
              )}
            </tbody>
          </S.Table>
        </S.TableContainer>
      </SectionCard.Content>

      {selectedCustomer && (
        <PurchaseDetailModal
          customerId={selectedCustomer.id}
          customerName={selectedCustomer.name}
          onClose={() => setSelectedCustomer(null)}
        />
      )}
    </SectionCard>
  );
};
