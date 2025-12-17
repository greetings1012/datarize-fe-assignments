import { useState } from 'react';
import { useCustomers } from '../../../queries/customer';
import { SelectedCustomer } from '../../../types/customerTable';

export const useCustomerTable = () => {
  const [nameFilter, setNameFilter] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | undefined>(
    undefined,
  );
  const [selectedCustomer, setSelectedCustomer] =
    useState<SelectedCustomer | null>(null);

  const { data, isLoading, isError } = useCustomers(sortOrder, nameFilter);

  const handleNameFilterChange = (value: string) => setNameFilter(value);
  const handleSortOrderChange = (value: 'asc' | 'desc' | 'id') => {
    // 'id' 선택 시 undefined로 설정하여 ID 정렬 사용
    setSortOrder(value === 'id' ? undefined : value);
  };
  const closeDetailModal = () => setSelectedCustomer(null);
  const openDetailModal = (id: number, name: string) =>
    setSelectedCustomer({ id, name });

  return {
    nameFilter,
    sortOrder,
    selectedCustomer,
    data,
    isLoading,
    isError,
    handleNameFilterChange,
    handleSortOrderChange,
    openDetailModal,
    closeDetailModal,
  };
};
