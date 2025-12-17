import { useState } from 'react';
import * as S from './CustomerTable.styles';
import { PurchaseDetailModal } from '../../../../components/PurchaseDetailModal/PurchaseDetailModal';
import { SectionCard } from '../../../../components/SectionCard/SectionCard';
import { UI_MESSAGES } from '../../../../constants/ui';
import { useCustomers } from '../../../../queries/customer';
import { useDebounce } from '../../../../hooks/useDebounce';

interface SelectedCustomer {
  id: number;
  name: string;
}

export const CustomerTable = () => {
  const [nameFilter, setNameFilter] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | undefined>(
    undefined,
  );
  const [selectedCustomer, setSelectedCustomer] =
    useState<SelectedCustomer | null>(null);

  const debouncedNameFilter = useDebounce(nameFilter);
  const { data, isLoading, error } = useCustomers(
    sortOrder,
    debouncedNameFilter.trim() || undefined,
  );
  const isSearching = nameFilter.trim() !== debouncedNameFilter.trim();

  const renderTableBody = () => {
    if (isSearching)
      return (
        <tr>
          <S.Td colSpan={4}>{UI_MESSAGES.SEARCHING.CUSTOMER}</S.Td>
        </tr>
      );
    if (isLoading)
      return (
        <tr>
          <S.Td colSpan={4}>{UI_MESSAGES.LOADING.CUSTOMER_TABLE}</S.Td>
        </tr>
      );
    if (error)
      return (
        <tr>
          <S.Td colSpan={4}>{error.message}</S.Td>
        </tr>
      );

    return data?.map((customer) => (
      <S.Tr
        key={customer.id}
        onClick={() =>
          setSelectedCustomer({ id: customer.id, name: customer.name })
        }
      >
        <S.Td>#{customer.id}</S.Td>
        <S.Td>{customer.name}</S.Td>
        <S.Td>{customer.count}회</S.Td>
        <S.Td>{customer.totalAmount.toLocaleString()}원</S.Td>
      </S.Tr>
    ));
  };

  return (
    <SectionCard>
      <SectionCard.Header>
        <SectionCard.Title>고객 목록</SectionCard.Title>
        <SectionCard.Controls>
          <S.Input
            type="text"
            placeholder="이름으로 검색"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          />
          <S.Select
            value={sortOrder || 'id'}
            onChange={(e) =>
              setSortOrder(
                e.target.value === 'id'
                  ? undefined
                  : (e.target.value as 'asc' | 'desc'),
              )
            }
          >
            <option value="id">ID순</option>
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
                <S.Th>총 구매 횟수</S.Th>
                <S.Th>총 구매액</S.Th>
              </tr>
            </thead>
            <tbody>{renderTableBody()}</tbody>
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
